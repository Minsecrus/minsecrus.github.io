#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unsortedAbbrGroups } from '../src/data/abbr.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const abbrPath = path.join(repoRoot, 'src', 'data', 'abbr.js')

const unitEntries = [
  { short: 'SI', description: 'International System of Units: standard metric framework / 国际单位制：现代公制计量体系' },
  { short: 'CGS', description: 'Centimeter-gram-second system / 厘米-克-秒制' },
  { short: 'MKS', description: 'Meter-kilogram-second system / 米-千克-秒制' },
  { short: 'FPS', description: 'Foot-pound-second system / 英尺-磅-秒制' },

  { short: 'm', description: 'meter: SI base unit of length / 米：长度基本单位' },
  { short: 'kg', description: 'kilogram: SI base unit of mass / 千克：质量基本单位' },
  { short: 's', description: 'second: SI base unit of time / 秒：时间基本单位' },
  { short: 'A', description: 'ampere: SI base unit of electric current / 安培：电流基本单位' },
  { short: 'K', description: 'kelvin: SI base unit of thermodynamic temperature / 开尔文：热力学温度基本单位' },
  { short: 'mol', description: 'mole: SI base unit of amount of substance / 摩尔：物质的量基本单位' },
  { short: 'cd', description: 'candela: SI base unit of luminous intensity / 坎德拉：发光强度基本单位' },

  { short: 'Hz', description: 'hertz: frequency, 1 Hz = 1 s^-1 / 赫兹：频率单位，1 Hz = 1 s^-1' },
  { short: 'N', description: 'newton: force, 1 N = 1 kg·m/s^2 / 牛顿：力单位，1 N = 1 kg·m/s^2' },
  { short: 'Pa', description: 'pascal: pressure, 1 Pa = 1 N/m^2 = 1 kg/(m·s^2) / 帕斯卡：压强单位，1 Pa = 1 N/m^2 = 1 kg/(m·s^2)' },
  { short: 'J', description: 'joule: energy, 1 J = 1 N·m = 1 kg·m^2/s^2 / 焦耳：能量单位，1 J = 1 N·m = 1 kg·m^2/s^2' },
  { short: 'W', description: 'watt: power, 1 W = 1 J/s = 1 kg·m^2/s^3 / 瓦特：功率单位，1 W = 1 J/s = 1 kg·m^2/s^3' },
  { short: 'C', description: 'coulomb: electric charge, 1 C = 1 A·s / 库仑：电荷单位，1 C = 1 A·s' },
  { short: 'V', description: 'volt: electric potential, 1 V = 1 W/A = 1 kg·m^2/(A·s^3) / 伏特：电势差单位，1 V = 1 W/A = 1 kg·m^2/(A·s^3)' },
  { short: 'F', description: 'farad: capacitance, 1 F = 1 C/V = 1 A^2·s^4/(kg·m^2) / 法拉：电容单位，1 F = 1 C/V = 1 A^2·s^4/(kg·m^2)' },
  { short: 'ohm', description: 'ohm: resistance, 1 ohm = 1 V/A = 1 kg·m^2/(A^2·s^3) / 欧姆：电阻单位，1 ohm = 1 V/A = 1 kg·m^2/(A^2·s^3)' },
  { short: 'S', description: 'siemens: conductance, 1 S = 1/ohm = A^2·s^3/(kg·m^2) / 西门子：电导单位，1 S = 1/ohm = A^2·s^3/(kg·m^2)' },
  { short: 'Wb', description: 'weber: magnetic flux, 1 Wb = 1 V·s = 1 kg·m^2/(A·s^2) / 韦伯：磁通量单位，1 Wb = 1 V·s = 1 kg·m^2/(A·s^2)' },
  { short: 'T', description: 'tesla: magnetic flux density, 1 T = 1 Wb/m^2 = 1 kg/(A·s^2) / 特斯拉：磁感应强度单位，1 T = 1 Wb/m^2 = 1 kg/(A·s^2)' },
  { short: 'H', description: 'henry: inductance, 1 H = 1 Wb/A = 1 kg·m^2/(A^2·s^2) / 亨利：电感单位，1 H = 1 Wb/A = 1 kg·m^2/(A^2·s^2)' },
  { short: 'lm', description: 'lumen: luminous flux, 1 lm = 1 cd·sr / 流明：光通量单位，1 lm = 1 cd·sr' },
  { short: 'lx', description: 'lux: illuminance, 1 lx = 1 lm/m^2 / 勒克斯：照度单位，1 lx = 1 lm/m^2' },
  { short: 'Bq', description: 'becquerel: radioactivity, 1 Bq = 1 s^-1 / 贝可勒尔：放射性活度单位，1 Bq = 1 s^-1' },
  { short: 'Gy', description: 'gray: absorbed dose, 1 Gy = 1 J/kg = 1 m^2/s^2 / 戈瑞：吸收剂量单位，1 Gy = 1 J/kg = 1 m^2/s^2' },
  { short: 'Sv', description: 'sievert: equivalent dose, 1 Sv = 1 J/kg = 1 m^2/s^2 / 希沃特：当量剂量单位，1 Sv = 1 J/kg = 1 m^2/s^2' },
  { short: 'kat', description: 'katal: catalytic activity, 1 kat = 1 mol/s / 卡塔尔：催化活性单位，1 kat = 1 mol/s' },

  { short: 'rad', description: 'radian: plane angle (dimensionless) / 弧度：平面角单位（无量纲）' },
  { short: 'sr', description: 'steradian: solid angle (dimensionless) / 球面度：立体角单位（无量纲）' },

  { short: 'min', description: 'minute: time, 1 min = 60 s / 分钟：时间单位，1 min = 60 s' },
  { short: 'h', description: 'hour: time, 1 h = 60 min = 3600 s / 小时：时间单位，1 h = 60 min = 3600 s' },
  { short: 'd', description: 'day: time, 1 d = 24 h = 86400 s / 天：时间单位，1 d = 24 h = 86400 s' },
  { short: 'L', description: 'liter: volume, 1 L = 1 dm^3 = 10^-3 m^3 / 升：体积单位，1 L = 1 dm^3 = 10^-3 m^3' },
  { short: 't', description: 'tonne: mass, 1 t = 1000 kg / 吨：质量单位，1 t = 1000 kg' },
  { short: 'eV', description: 'electronvolt: energy, 1 eV = 1.602176634e-19 J / 电子伏特：能量单位，1 eV = 1.602176634e-19 J' },
  { short: 'Da', description: 'dalton: mass, 1 Da = 1.66053906660e-27 kg / 道尔顿：质量单位，1 Da = 1.66053906660e-27 kg' },
  { short: 'au', description: 'astronomical unit: length, 1 au = 149597870700 m / 天文单位：长度单位，1 au = 149597870700 m' },
  { short: 'bar', description: 'bar: pressure, 1 bar = 10^5 Pa / 巴：压强单位，1 bar = 10^5 Pa' },
  { short: 'atm', description: 'standard atmosphere: pressure, 1 atm = 101325 Pa / 标准大气压：压强单位，1 atm = 101325 Pa' },
  { short: 'mmHg', description: 'millimeter of mercury: pressure, 1 mmHg = 133.322 Pa / 毫米汞柱：压强单位，1 mmHg = 133.322 Pa' },

  { short: 'in', description: 'inch: length, 1 in = 2.54 cm = 0.0254 m / 英寸：长度单位，1 in = 2.54 cm = 0.0254 m' },
  { short: 'ft', description: 'foot: length, 1 ft = 12 in = 0.3048 m / 英尺：长度单位，1 ft = 12 in = 0.3048 m' },
  { short: 'yd', description: 'yard: length, 1 yd = 3 ft = 0.9144 m / 码：长度单位，1 yd = 3 ft = 0.9144 m' },
  { short: 'mi', description: 'mile: length, 1 mi = 1760 yd = 1609.344 m / 英里：长度单位，1 mi = 1760 yd = 1609.344 m' },
  { short: 'nmi', description: 'nautical mile: length, 1 nmi = 1852 m / 海里：长度单位，1 nmi = 1852 m' },

  { short: 'lb', description: 'pound (avoirdupois): mass, 1 lb = 0.45359237 kg / 磅（常衡制）：质量单位，1 lb = 0.45359237 kg' },
  { short: 'oz', description: 'ounce (avoirdupois): mass, 1 oz = 1/16 lb = 28.349523125 g / 盎司（常衡制）：质量单位，1 oz = 1/16 lb = 28.349523125 g' },

  { short: 'bps', description: 'bits per second: data rate / 比特每秒：数据速率单位' },
  { short: 'kbps', description: 'kilobits per second: 1 kbps = 10^3 bps / 千比特每秒：1 kbps = 10^3 bps' },
  { short: 'Mbps', description: 'megabits per second: 1 Mbps = 10^6 bps / 兆比特每秒：1 Mbps = 10^6 bps' },
  { short: 'Gbps', description: 'gigabits per second: 1 Gbps = 10^9 bps / 吉比特每秒：1 Gbps = 10^9 bps' },

  { short: 'B', description: 'byte: 1 B = 8 b / 字节：1 B = 8 bit' },
  { short: 'KB', description: 'kilobyte (decimal): 1 KB = 10^3 B / 千字节（十进制）：1 KB = 10^3 B' },
  { short: 'MB', description: 'megabyte (decimal): 1 MB = 10^6 B / 兆字节（十进制）：1 MB = 10^6 B' },
  { short: 'GB', description: 'gigabyte (decimal): 1 GB = 10^9 B / 吉字节（十进制）：1 GB = 10^9 B' },
  { short: 'TB', description: 'terabyte (decimal): 1 TB = 10^12 B / 太字节（十进制）：1 TB = 10^12 B' },
  { short: 'KiB', description: 'kibibyte (binary): 1 KiB = 2^10 B = 1024 B / KiB（二进制）：1 KiB = 2^10 B = 1024 B' },
  { short: 'MiB', description: 'mebibyte (binary): 1 MiB = 2^20 B / MiB（二进制）：1 MiB = 2^20 B' },
  { short: 'GiB', description: 'gibibyte (binary): 1 GiB = 2^30 B / GiB（二进制）：1 GiB = 2^30 B' },
  { short: 'TiB', description: 'tebibyte (binary): 1 TiB = 2^40 B / TiB（二进制）：1 TiB = 2^40 B' },

  { short: 'dpi', description: 'dots per inch: print/display density / 每英寸点数：打印或显示密度单位' },
  { short: 'ppi', description: 'pixels per inch: pixel density / 每英寸像素：像素密度单位' },
  { short: 'dB', description: 'decibel: logarithmic ratio, 10 dB = 10x power ratio / 分贝：对数比值单位，10 dB = 10 倍功率比' },
]

function toId(short) {
  return short.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function letterFor(short) {
  const c = short[0]
  if (/[0-9]/.test(c)) return c
  if (/[a-z]/i.test(c)) return c.toUpperCase()
  return '#'
}

function renderGroupsAsJs(groups) {
  const lines = []
  lines.push('export const unsortedAbbrGroups = [')
  for (const group of groups) {
    lines.push('    {')
    lines.push(`        letter: ${JSON.stringify(group.letter)},`)
    lines.push('        items: [')
    for (const item of group.items) {
      lines.push(`            { id: ${JSON.stringify(item.id)}, short: ${JSON.stringify(item.short)}, description: ${JSON.stringify(item.description)} },`)
    }
    lines.push('        ]')
    lines.push('    },')
  }
  lines.push('];')
  return lines.join('\n')
}

function mergeEntries(groups, additions) {
  const cloned = JSON.parse(JSON.stringify(groups))
  const byLetter = new Map(cloned.map((g) => [g.letter, g]))
  const byShort = new Map()

  for (const g of cloned) {
    for (const item of g.items) {
      byShort.set(item.short.toLowerCase(), item)
    }
  }

  let added = 0
  let updated = 0
  let skipped = 0

  for (const entry of additions) {
    const key = entry.short.toLowerCase()
    const existing = byShort.get(key)

    if (existing) {
      if (!existing.description.includes(entry.description)) {
        existing.description = `${existing.description} || ${entry.description}`
        updated += 1
      } else {
        skipped += 1
      }
      continue
    }

    const idBase = toId(entry.short)
    if (!idBase) {
      skipped += 1
      continue
    }

    let id = idBase
    let salt = 2
    const idTaken = new Set(cloned.flatMap((g) => g.items.map((i) => i.id)))
    while (idTaken.has(id)) {
      id = `${idBase}${salt}`
      salt += 1
    }

    const letter = letterFor(entry.short)
    if (!byLetter.has(letter)) {
      const group = { letter, items: [] }
      cloned.push(group)
      byLetter.set(letter, group)
    }

    const target = byLetter.get(letter)
    const created = { id, short: entry.short, description: entry.description }
    target.items.push(created)
    byShort.set(key, created)
    added += 1
  }

  cloned.sort((a, b) => a.letter.localeCompare(b.letter))
  for (const g of cloned) {
    g.items.sort((a, b) => a.id.localeCompare(b.id))
  }

  return { merged: cloned, added, updated, skipped }
}

async function main() {
  const current = await fs.readFile(abbrPath, { encoding: 'utf8' })
  const { merged, added, updated, skipped } = mergeEntries(unsortedAbbrGroups, unitEntries)
  const replacement = renderGroupsAsJs(merged)
  const next = current.replace(/export const unsortedAbbrGroups = \[[\s\S]*?\n\];/, replacement)
  if (next === current) {
    throw new Error('Failed to replace unsortedAbbrGroups block')
  }

  await fs.writeFile(abbrPath, next, { encoding: 'utf8' })
  console.log(JSON.stringify({ added, updated, skipped, totalGroups: merged.length }, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
