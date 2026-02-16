#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unsortedAbbrGroups } from '../src/data/abbr.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')

function printUsage() {
  console.log(`Usage:
  # Single page import
  node scripts/import-wikipedia-abbr.mjs --url "https://en.wikipedia.org/wiki/List_of_medical_abbreviations"

  # Crawl all acronym-related pages linked from Lists_of_acronyms
  node scripts/import-wikipedia-abbr.mjs --url "https://en.wikipedia.org/wiki/Lists_of_acronyms" --crawl

Options:
  --title <page title>          Wikipedia page title
  --url <wiki page url>         Wikipedia page url, title auto extracted
  --lang <code>                 Wikipedia language code (default: en)
  --crawl                       Crawl acronym/abbreviation links from the seed page
  --max-pages <number>          Max linked pages to crawl (default: 120)
  --out <file>                  Output JSON path (default: scripts/wikipedia-abbr-import.json)
  --write                       Write merged data back to src/data/abbr.js
  --append-source               Append source page URL in descriptions
  --help                        Show this help
`)
}

function parseArgs(argv) {
  const args = {
    lang: 'en',
    crawl: false,
    maxPages: 120,
    out: 'scripts/wikipedia-abbr-import.json',
    write: false,
    appendSource: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const k = argv[i]
    const v = argv[i + 1]

    if (k === '--title') {
      args.title = v
      i += 1
    } else if (k === '--url') {
      args.url = v
      i += 1
    } else if (k === '--lang') {
      args.lang = v
      i += 1
    } else if (k === '--crawl') {
      args.crawl = true
    } else if (k === '--max-pages') {
      args.maxPages = Number(v)
      i += 1
    } else if (k === '--out') {
      args.out = v
      i += 1
    } else if (k === '--write') {
      args.write = true
    } else if (k === '--append-source') {
      args.appendSource = true
    } else if (k === '--help' || k === '-h') {
      args.help = true
    } else {
      throw new Error(`Unknown arg: ${k}`)
    }
  }

  if (!Number.isInteger(args.maxPages) || args.maxPages < 1) {
    throw new Error('--max-pages must be a positive integer')
  }

  return args
}

function titleFromUrl(rawUrl) {
  const u = new URL(rawUrl)
  const parts = u.pathname.split('/').filter(Boolean)
  const wikiIdx = parts.findIndex((p) => p === 'wiki')
  if (wikiIdx === -1 || !parts[wikiIdx + 1]) {
    throw new Error('Cannot parse title from url. Expected .../wiki/<TITLE>')
  }
  return decodeURIComponent(parts[wikiIdx + 1]).replace(/_/g, ' ')
}

function pageUrl(lang, title) {
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([\da-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
}

function htmlToText(html) {
  return decodeHtmlEntities(
    html
      .replace(/<sup[^>]*class="reference"[^>]*>[\s\S]*?<\/sup>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<br\s*\/?>/gi, ' / ')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

function normalizeShort(raw) {
  if (!raw) return null
  const cleaned = raw
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[,:;\-–—]+$/g, '')
  return cleaned || null
}

function toId(short) {
  return short.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function looksLikeAbbreviation(short) {
  if (!short || short.length < 2 || short.length > 24) return false
  if (/\s{2,}/.test(short)) return false
  const alphaNum = short.replace(/[^A-Za-z0-9]/g, '')
  if (alphaNum.length < 2 || alphaNum.length > 20) return false

  const hasUpperOrDigit = /[A-Z0-9]/.test(short)
  if (!hasUpperOrDigit) return false

  const words = short.split(/\s+/)
  if (words.length > 3) return false

  return true
}

function guessFromListItem(rawLi) {
  const boldMatch = rawLi.match(/<(?:b|strong)\b[^>]*>([\s\S]*?)<\/(?:b|strong)>/i)
  const lineText = htmlToText(rawLi)
  if (!lineText) return null

  if (boldMatch) {
    const short = normalizeShort(htmlToText(boldMatch[1]))
    if (looksLikeAbbreviation(short)) {
      const escaped = short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const rest = lineText.replace(new RegExp(`^${escaped}\\s*[:：\\-–—]?\\s*`, 'i'), '').trim()
      if (rest) return { short, description: rest }
    }
  }

  const m = lineText.match(/^([A-Za-z0-9][A-Za-z0-9+./\-\s]{0,28})\s*[:：\-–—]\s+(.+)$/)
  if (!m) return null

  const short = normalizeShort(m[1])
  const description = m[2]?.trim()
  if (!looksLikeAbbreviation(short) || !description) return null
  return { short, description }
}

function extractListItems(html) {
  const items = []
  const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi
  let m
  while ((m = liRegex.exec(html)) !== null) {
    const parsed = guessFromListItem(m[1])
    if (parsed) items.push(parsed)
  }
  return items
}

function extractTableItems(html) {
  const out = []
  const trRegex = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi
  let tr
  while ((tr = trRegex.exec(html)) !== null) {
    const cells = []
    const tdRegex = /<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi
    let td
    while ((td = tdRegex.exec(tr[1])) !== null) cells.push(td[1])
    if (cells.length < 2) continue

    const short = normalizeShort(htmlToText(cells[0]))
    const description = htmlToText(cells[1])
    if (!looksLikeAbbreviation(short) || !description) continue
    out.push({ short, description })
  }
  return out
}

function sanitizeImported(items, sourceUrl, appendSource) {
  const unique = new Map()

  for (const item of items) {
    const short = normalizeShort(item.short)
    const description = item.description?.trim()
    if (!looksLikeAbbreviation(short) || !description) continue

    const id = toId(short)
    if (!id || id.length < 2 || id.length > 20) continue

    const first = id[0]
    if (!/[a-z0-9]/.test(first)) continue

    if (!unique.has(id)) {
      unique.set(id, {
        id,
        short,
        description: appendSource ? `${description} (source: ${sourceUrl})` : description,
      })
    }
  }

  return [...unique.values()]
}

function extractWikiLinks(html) {
  const links = []
  const rx = /<a\b[^>]*href="\/wiki\/([^"#:]+)"[^>]*>/gi
  let m
  while ((m = rx.exec(html)) !== null) {
    const title = decodeURIComponent(m[1]).replace(/_/g, ' ')
    links.push(title)
  }
  return [...new Set(links)]
}

function pickAcronymPages(titles) {
  const pattern = /(acronym|abbreviation|initialism)/i
  return titles.filter((t) => pattern.test(t) && !/^Lists? of acronyms$/i.test(t))
}

function mergeIntoGroups(existingGroups, imported) {
  const groups = JSON.parse(JSON.stringify(existingGroups))
  const byLetter = new Map(groups.map((g) => [g.letter, g]))
  const existingIds = new Set(groups.flatMap((g) => g.items.map((i) => i.id.toLowerCase())))

  let added = 0
  let skipped = 0

  for (const item of imported) {
    if (existingIds.has(item.id)) {
      skipped += 1
      continue
    }

    const first = item.id[0]
    const letter = /[0-9]/.test(first) ? first : first.toUpperCase()
    if (!/[A-Z0-9]/.test(letter)) {
      skipped += 1
      continue
    }

    if (!byLetter.has(letter)) {
      const group = { letter, items: [] }
      byLetter.set(letter, group)
      groups.push(group)
    }

    byLetter.get(letter).items.push(item)
    existingIds.add(item.id)
    added += 1
  }

  return { merged: groups, added, skipped }
}

function sortGroups(groups) {
  const cloned = JSON.parse(JSON.stringify(groups))
  cloned.forEach((g) => g.items.sort((a, b) => a.id.localeCompare(b.id)))
  cloned.sort((a, b) => a.letter.localeCompare(b.letter))
  return cloned
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

async function fetchWikiHtml({ lang, title }) {
  const endpoint = `https://${lang}.wikipedia.org/w/api.php`
  const params = new URLSearchParams({
    action: 'parse',
    page: title,
    prop: 'text',
    format: 'json',
    formatversion: '2',
    origin: '*',
  })
  const url = `${endpoint}?${params.toString()}`

  let res
  try {
    res = await fetch(url)
  } catch (error) {
    throw new Error(`Network request failed for ${pageUrl(lang, title)}: ${error.message}`)
  }

  if (!res.ok) {
    throw new Error(`Wikipedia API request failed (${res.status}) for ${pageUrl(lang, title)}`)
  }

  const json = await res.json()
  if (json.error) {
    throw new Error(`Wikipedia API error for ${pageUrl(lang, title)}: ${json.error.info || 'unknown'}`)
  }

  return { html: json.parse.text, url: pageUrl(lang, title) }
}

async function updateAbbrFile(newGroups) {
  const abbrPath = path.join(repoRoot, 'src', 'data', 'abbr.js')
  const current = await fs.readFile(abbrPath, 'utf8')
  const replacement = renderGroupsAsJs(newGroups)
  const next = current.replace(/export const unsortedAbbrGroups = \[[\s\S]*?\n\];/, replacement)
  if (next === current) {
    throw new Error('Failed to update src/data/abbr.js: target block not found')
  }
  await fs.writeFile(abbrPath, next)
}

async function collectFromPage({ lang, title, appendSource }) {
  const { html, url } = await fetchWikiHtml({ lang, title })
  const tableItems = extractTableItems(html)
  const listItems = extractListItems(html)
  const imported = sanitizeImported([...tableItems, ...listItems], url, appendSource)
  return { title, url, imported, html }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printUsage()
    return
  }

  if (!args.title && !args.url) {
    printUsage()
    throw new Error('Provide --title or --url')
  }

  const title = args.title || titleFromUrl(args.url)
  const langFromUrl = args.url ? new URL(args.url).hostname.split('.')[0] : null
  const lang = args.lang || langFromUrl || 'en'
  const autoCrawl = /^Lists? of acronyms$/i.test(title)
  const crawl = args.crawl || autoCrawl

  const seed = await collectFromPage({ lang, title, appendSource: args.appendSource })
  const pages = [
    {
      title: seed.title,
      url: seed.url,
      importedCount: seed.imported.length,
    },
  ]

  let allImported = [...seed.imported]

  if (crawl) {
    const linkedTitles = pickAcronymPages(extractWikiLinks(seed.html)).slice(0, args.maxPages)
    for (const linkedTitle of linkedTitles) {
      try {
        const r = await collectFromPage({ lang, title: linkedTitle, appendSource: args.appendSource })
        pages.push({ title: r.title, url: r.url, importedCount: r.imported.length })
        allImported = allImported.concat(r.imported)
      } catch (error) {
        pages.push({ title: linkedTitle, url: pageUrl(lang, linkedTitle), importedCount: 0, error: error.message })
      }
    }
  }

  const dedupImported = [...new Map(allImported.map((item) => [item.id, item])).values()]
  const { merged, added, skipped } = mergeIntoGroups(unsortedAbbrGroups, dedupImported)
  const sortedMerged = sortGroups(merged)

  const outPath = path.resolve(repoRoot, args.out)
  await fs.writeFile(
    outPath,
    JSON.stringify(
      {
        seed: seed.url,
        lang,
        crawl,
        pagesProcessed: pages.length,
        pages,
        importedCount: dedupImported.length,
        added,
        skipped,
      },
      null,
      2,
    ),
    'utf8',
  )

  if (args.write) {
    await updateAbbrFile(sortedMerged)
  }

  console.log(`Seed page: ${seed.url}`)
  console.log(`Crawl mode: ${crawl ? 'on' : 'off'}`)
  console.log(`Pages processed: ${pages.length}`)
  console.log(`Imported candidates after de-dup: ${dedupImported.length}`)
  console.log(`Added: ${added}, Skipped(existing/invalid): ${skipped}`)
  console.log(`Details written: ${path.relative(repoRoot, outPath)}`)
  if (args.write) {
    console.log('Updated: src/data/abbr.js')
  } else {
    console.log('Dry run mode: pass --write to merge into src/data/abbr.js')
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
