#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unsortedAbbrGroups } from '../src/data/abbr.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')

function parseArgs(argv) {
  const args = {
    write: false,
    limit: Infinity,
    delayMs: 150,
    cache: 'scripts/.abbr-zh-cache.json',
    out: 'scripts/abbr-zh-backfill-report.json',
  }

  for (let i = 0; i < argv.length; i += 1) {
    const k = argv[i]
    const v = argv[i + 1]

    if (k === '--write') args.write = true
    else if (k === '--limit') {
      args.limit = Number(v)
      i += 1
    } else if (k === '--delay-ms') {
      args.delayMs = Number(v)
      i += 1
    } else if (k === '--cache') {
      args.cache = v
      i += 1
    } else if (k === '--out') {
      args.out = v
      i += 1
    } else if (k === '--help' || k === '-h') {
      args.help = true
    } else {
      throw new Error(`Unknown arg: ${k}`)
    }
  }

  if (!Number.isFinite(args.limit) || args.limit < 1) args.limit = Infinity
  if (!Number.isFinite(args.delayMs) || args.delayMs < 0) args.delayMs = 150
  return args
}

function hasChinese(text) {
  return /[\u4e00-\u9fff]/.test(text)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function loadCache(cachePath) {
  try {
    const raw = await fs.readFile(cachePath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function saveCache(cachePath, cache) {
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2), 'utf8')
}

async function translateEnToZh(text) {
  const url = new URL('https://translate.googleapis.com/translate_a/single')
  url.searchParams.set('client', 'gtx')
  url.searchParams.set('sl', 'en')
  url.searchParams.set('tl', 'zh-CN')
  url.searchParams.set('dt', 't')
  url.searchParams.set('q', text)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const json = await res.json()
  if (!Array.isArray(json) || !Array.isArray(json[0])) {
    throw new Error('Unexpected translation response')
  }

  const translated = json[0].map((seg) => seg[0]).join('').trim()
  if (!translated) throw new Error('Empty translation')
  return translated
}

function renderGroupsAsJs(groups) {
  const lines = []
  lines.push('export const unsortedAbbrGroups = [')
  for (const group of groups) {
    lines.push('    {')
    lines.push(`        letter: ${JSON.stringify(group.letter)},`)
    lines.push('        items: [')
    for (const item of group.items) {
      lines.push(
        `            { id: ${JSON.stringify(item.id)}, short: ${JSON.stringify(item.short)}, description: ${JSON.stringify(item.description)} },`,
      )
    }
    lines.push('        ]')
    lines.push('    },')
  }
  lines.push('];')
  return lines.join('\n')
}

async function writeAbbrFile(groups) {
  const abbrPath = path.join(repoRoot, 'src', 'data', 'abbr.js')
  const current = await fs.readFile(abbrPath, 'utf8')
  const replacement = renderGroupsAsJs(groups)
  const next = current.replace(/export const unsortedAbbrGroups = \[[\s\S]*?\n\];/, replacement)
  if (next === current) {
    throw new Error('Failed to update src/data/abbr.js: target block not found')
  }
  await fs.writeFile(abbrPath, next, 'utf8')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(`Usage:
  node scripts/backfill-abbr-zh.mjs [--write] [--limit 200] [--delay-ms 150]

Options:
  --write              Write translated descriptions back to src/data/abbr.js
  --limit <n>          Max items to translate this run (default: all)
  --delay-ms <n>       Delay between requests in ms (default: 150)
  --cache <file>       Cache file path (default: scripts/.abbr-zh-cache.json)
  --out <file>         Report path (default: scripts/abbr-zh-backfill-report.json)
`)
    return
  }

  const groups = JSON.parse(JSON.stringify(unsortedAbbrGroups))
  const cachePath = path.resolve(repoRoot, args.cache)
  const outPath = path.resolve(repoRoot, args.out)
  const cache = await loadCache(cachePath)

  const targets = []
  for (const group of groups) {
    for (const item of group.items) {
      if (!hasChinese(item.description)) {
        targets.push(item)
      }
    }
  }

  const capped = targets.slice(0, args.limit)
  const report = {
    totalWithoutChinese: targets.length,
    translated: 0,
    fromCache: 0,
    failed: 0,
    failures: [],
  }

  for (let i = 0; i < capped.length; i += 1) {
    const item = capped[i]
    const key = item.description.trim()

    try {
      let zh = cache[key]
      if (zh) {
        report.fromCache += 1
      } else {
        zh = await translateEnToZh(key)
        cache[key] = zh
        await sleep(args.delayMs)
      }

      item.description = `${key} / ${zh}`
      report.translated += 1
    } catch (error) {
      report.failed += 1
      report.failures.push({ id: item.id, error: error.message })
    }
  }

  await saveCache(cachePath, cache)

  if (args.write) {
    await writeAbbrFile(groups)
  }

  await fs.writeFile(outPath, JSON.stringify(report, null, 2), 'utf8')

  console.log(`Need translation: ${targets.length}`)
  console.log(`Processed this run: ${capped.length}`)
  console.log(`Translated: ${report.translated} (cache: ${report.fromCache})`)
  console.log(`Failed: ${report.failed}`)
  console.log(`Cache: ${path.relative(repoRoot, cachePath)}`)
  console.log(`Report: ${path.relative(repoRoot, outPath)}`)
  console.log(args.write ? 'Updated: src/data/abbr.js' : 'Dry run mode: pass --write to apply changes')
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
