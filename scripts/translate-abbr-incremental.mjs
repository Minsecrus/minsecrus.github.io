#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { unsortedAbbrGroups } from '../src/data/abbr.js'

const DATA_PATH = path.resolve('src/data/abbr.js')
const STATE_PATH = path.resolve('scripts/.abbr-translate-state.json')

function parseArgs(argv) {
  const args = {
    batch: 100,
    limit: Infinity,
    delayMs: 50,
    removeInvalid: true,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const k = argv[i]
    const v = argv[i + 1]

    if (k === '--batch') {
      args.batch = Number(v)
      i += 1
    } else if (k === '--limit') {
      args.limit = Number(v)
      i += 1
    } else if (k === '--delay-ms') {
      args.delayMs = Number(v)
      i += 1
    } else if (k === '--keep-invalid') {
      args.removeInvalid = false
    } else if (k === '--help' || k === '-h') {
      args.help = true
    } else {
      throw new Error(`Unknown arg: ${k}`)
    }
  }

  if (!Number.isFinite(args.batch) || args.batch < 1) args.batch = 100
  if (!Number.isFinite(args.limit) || args.limit < 1) args.limit = Infinity
  if (!Number.isFinite(args.delayMs) || args.delayMs < 0) args.delayMs = 50

  return args
}

function printHelp() {
  console.log(`Usage:
  node scripts/translate-abbr-incremental.mjs [options]

Options:
  --batch <n>         Save progress every n translated items (default: 100)
  --limit <n>         Stop after translating n items in this run (default: all)
  --delay-ms <n>      Delay between network requests (default: 50)
  --keep-invalid      Do not remove invalid/non-acronym entries
`)
}

function isValidAcronym(short) {
  if (!short || typeof short !== 'string') return false
  const s = short.trim()
  if (!s || s.length < 2 || s.length > 20) return false
  if (/\s/.test(s)) return false

  // allow A-Z, a-z, 0-9 and common acronym symbols
  if (!/^[A-Za-z0-9+&./-]+$/.test(s)) return false

  // must contain at least one uppercase letter or digit
  if (!/[A-Z0-9]/.test(s)) return false

  return true
}

function normalizeEn(text) {
  return text
    .trim()
    .replace(/^[-,;:\s]+/, '')
    .replace(/\s+/g, ' ')
}

async function sleep(ms) {
  if (ms <= 0) return
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function translateToZh(text) {
  const url = new URL('https://translate.googleapis.com/translate_a/single')
  url.searchParams.set('client', 'gtx')
  url.searchParams.set('sl', 'en')
  url.searchParams.set('tl', 'zh-CN')
  url.searchParams.set('dt', 't')
  url.searchParams.set('q', text)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const out = json?.[0]?.map?.((seg) => seg?.[0] ?? '').join('').trim()
  if (!out) throw new Error('Empty translation response')
  return out
}

function renderGroups(arr) {
  const lines = []
  lines.push('export const unsortedAbbrGroups = [')
  for (const g of arr) {
    lines.push('    {')
    lines.push(`        letter: ${JSON.stringify(g.letter)},`)
    lines.push('        items: [')
    for (const it of g.items) {
      lines.push(`            { id: ${JSON.stringify(it.id)}, short: ${JSON.stringify(it.short)}, description: ${JSON.stringify(it.description)} },`)
    }
    lines.push('        ]')
    lines.push('    },')
  }
  lines.push('];')
  return lines.join('\n')
}

async function writeDataFile(groups) {
  const source = await fs.readFile(DATA_PATH, 'utf8')
  const replacement = renderGroups(groups)
  const next = source.replace(/export const unsortedAbbrGroups = \[[\s\S]*?\n\];/, replacement)
  if (next === source) throw new Error('Could not locate unsortedAbbrGroups block for write')
  await fs.writeFile(DATA_PATH, next, 'utf8')
}

async function writeState(state) {
  await fs.writeFile(STATE_PATH, JSON.stringify(state, null, 2), 'utf8')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  const groups = JSON.parse(JSON.stringify(unsortedAbbrGroups))

  let removed = 0
  if (args.removeInvalid) {
    for (const g of groups) {
      const before = g.items.length
      g.items = g.items.filter((it) => isValidAcronym(it.short))
      removed += before - g.items.length
    }
  }

  const queue = []
  for (const g of groups) {
    for (const it of g.items) {
      if (!it.description.includes(' / ')) {
        queue.push(it)
      }
    }
  }

  const totalPending = queue.length
  let translated = 0
  let failed = 0

  const cache = new Map()
  let processedThisRun = 0

  for (const it of queue) {
    if (processedThisRun >= args.limit) break

    const en = normalizeEn(it.description)
    if (!en) continue

    try {
      let zh = cache.get(en)
      if (!zh) {
        let ok = false
        for (let i = 0; i < 3 && !ok; i += 1) {
          try {
            zh = await translateToZh(en)
            ok = true
          } catch {
            await sleep(150 * (i + 1))
          }
        }
        if (!ok || !zh) throw new Error('Translate failed after retries')
        cache.set(en, zh)
        await sleep(args.delayMs)
      }

      it.description = `${en} / ${zh}`
      translated += 1
      processedThisRun += 1

      if (translated % args.batch === 0) {
        await writeDataFile(groups)
        await writeState({
          timestamp: new Date().toISOString(),
          removedInvalid: removed,
          totalPendingAtStart: totalPending,
          translatedThisRun: translated,
          failedThisRun: failed,
          remainingEstimate: totalPending - translated,
        })
        console.log(`saved checkpoint: ${translated}/${Math.min(totalPending, args.limit === Infinity ? totalPending : args.limit)}`)
      }
    } catch {
      failed += 1
      processedThisRun += 1
    }
  }

  await writeDataFile(groups)
  await writeState({
    timestamp: new Date().toISOString(),
    removedInvalid: removed,
    totalPendingAtStart: totalPending,
    translatedThisRun: translated,
    failedThisRun: failed,
    remainingEstimate: Math.max(0, totalPending - translated),
    completeRunLimit: args.limit,
  })

  console.log(JSON.stringify({ removedInvalid: removed, totalPendingAtStart: totalPending, translatedThisRun: translated, failedThisRun: failed }, null, 2))
  console.log(`state saved: ${STATE_PATH}`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
