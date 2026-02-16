#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unsortedAbbrGroups } from '../src/data/abbr.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const abbrPath = path.join(repoRoot, 'src', 'data', 'abbr.js')

const entries = [
  // governance
  { short: 'UNGA', description: 'United Nations General Assembly / 联合国大会' },
  { short: 'UNSC', description: 'United Nations Security Council / 联合国安全理事会' },
  { short: 'UNHCR', description: 'United Nations High Commissioner for Refugees / 联合国难民事务高级专员公署' },
  { short: 'UNICEF', description: "United Nations Children's Fund / 联合国儿童基金会" },
  { short: 'UNDP', description: 'United Nations Development Programme / 联合国开发计划署' },
  { short: 'UNESCO', description: 'United Nations Educational, Scientific and Cultural Organization / 联合国教育、科学及文化组织' },
  { short: 'WHO', description: 'World Health Organization / 世界卫生组织' },
  { short: 'ILO', description: 'International Labour Organization / 国际劳工组织' },
  { short: 'FAO', description: 'Food and Agriculture Organization of the United Nations / 联合国粮食及农业组织' },
  { short: 'WIPO', description: 'World Intellectual Property Organization / 世界知识产权组织' },
  { short: 'UNFCCC', description: 'United Nations Framework Convention on Climate Change / 联合国气候变化框架公约' },
  { short: 'IPCC', description: 'Intergovernmental Panel on Climate Change / 政府间气候变化专门委员会' },
  { short: 'APEC', description: 'Asia-Pacific Economic Cooperation / 亚太经济合作组织' },
  { short: 'BRICS', description: 'Brazil, Russia, India, China and South Africa cooperation mechanism / 金砖国家合作机制' },
  { short: 'G20', description: 'Group of Twenty major economies / 二十国集团' },
  { short: 'OSCE', description: 'Organization for Security and Co-operation in Europe / 欧洲安全与合作组织' },
  { short: 'OAS', description: 'Organization of American States / 美洲国家组织' },

  // economics
  { short: 'ESG', description: 'Environmental, Social and Governance: sustainability assessment framework / 环境、社会与治理：可持续发展评估框架' },
  { short: 'OKR', description: 'Objectives and Key Results: goal management method / 目标与关键结果：目标管理方法' },
  { short: 'SCM', description: 'Supply Chain Management / 供应链管理' },

  // medical
  { short: 'WHOQOL', description: 'World Health Organization Quality of Life assessment / 世界卫生组织生活质量评估量表' },

  // internet data
  { short: 'AGI', description: 'Artificial General Intelligence / 通用人工智能' },
  { short: 'NLP', description: 'Natural Language Processing / 自然语言处理' },
  { short: 'RAG', description: 'Retrieval-Augmented Generation / 检索增强生成' },
  { short: 'BI', description: 'Business Intelligence / 商业智能' },
  { short: 'IIoT', description: 'Industrial Internet of Things / 工业物联网' },
  { short: 'AR', description: 'Augmented Reality / 增强现实' },
  { short: 'XR', description: 'Extended Reality / 扩展现实' },
  { short: 'YAML', description: "YAML Ain't Markup Language: human-readable data serialization format / YAML：一种可读性高的数据序列化格式" },
  { short: 'SSO', description: 'Single Sign-On / 单点登录' },
  { short: 'IAM', description: 'Identity and Access Management / 身份与访问管理' },
  { short: 'RBAC', description: 'Role-Based Access Control / 基于角色的访问控制' },
  { short: 'ABAC', description: 'Attribute-Based Access Control / 基于属性的访问控制' },

  // software architecture
  { short: 'DDD', description: 'Domain-Driven Design / 领域驱动设计' },
  { short: 'BDD', description: 'Behavior-Driven Development / 行为驱动开发' },
  { short: 'CI/CD', description: 'Continuous Integration and Continuous Delivery or Deployment / 持续集成与持续交付（或持续部署）' },
  { short: 'MVVM', description: 'Model-View-ViewModel architecture pattern / 模型-视图-视图模型架构模式' },
  { short: 'CQRS', description: 'Command Query Responsibility Segregation / 命令查询职责分离' },
  { short: 'SOLID', description: 'Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion principles / SOLID 五大设计原则' },
  { short: 'DRY', description: "Don't Repeat Yourself / 不要重复自己（避免重复代码与逻辑）" },
  { short: 'YAGNI', description: "You Aren't Gonna Need It / 你不会需要它（避免过度设计）" },
  { short: 'CRUD', description: 'Create, Read, Update and Delete / 增删改查' },
  { short: 'JWT', description: 'JSON Web Token / JSON Web 令牌' },

  // hardware and communication
  { short: 'RAID', description: 'Redundant Array of Independent Disks / 独立磁盘冗余阵列' },
  { short: 'FPGA', description: 'Field-Programmable Gate Array / 现场可编程门阵列' },
  { short: 'ASIC', description: 'Application-Specific Integrated Circuit / 专用集成电路' },
  { short: 'RS-232', description: 'Recommended Standard 232 serial communication interface / RS-232 串行通信接口标准' },
  { short: 'RS-485', description: 'Recommended Standard 485 differential serial communication standard / RS-485 差分串行通信标准' },
  { short: 'HDMI', description: 'High-Definition Multimedia Interface / 高清多媒体接口' },
  { short: 'RFID', description: 'Radio-Frequency Identification / 射频识别' },
  { short: 'BLE', description: 'Bluetooth Low Energy / 低功耗蓝牙' },
  { short: '5G', description: 'Fifth Generation mobile communication technology / 第五代移动通信技术' },
  { short: '6G', description: 'Sixth Generation mobile communication technology / 第六代移动通信技术' },
  { short: 'GNSS', description: 'Global Navigation Satellite System / 全球卫星导航系统' },
  { short: 'GLONASS', description: 'Global Navigation Satellite System of Russia / 俄罗斯全球导航卫星系统' },
  { short: 'BeiDou', description: 'BeiDou Navigation Satellite System / 北斗卫星导航系统' },

  // engineering quality
  { short: 'IEC', description: 'International Electrotechnical Commission / 国际电工委员会' },
  { short: 'DIN', description: 'Deutsches Institut fur Normung: German standardization institute / 德国标准化学会' },
  { short: 'JIS', description: 'Japanese Industrial Standards / 日本工业标准' },
  { short: 'UL', description: 'Underwriters Laboratories safety certification / UL 安全认证体系' },
  { short: 'CE', description: 'Conformite Europeenne marking / CE 合格认证标志' },
  { short: 'RoHS', description: 'Restriction of Hazardous Substances / 有害物质限制指令' },
  { short: 'REACH', description: 'Registration, Evaluation, Authorization and Restriction of Chemicals / 化学品注册、评估、许可和限制法规' },
  { short: 'GMP', description: 'Good Manufacturing Practice / 良好生产规范' },
  { short: 'GLP', description: 'Good Laboratory Practice / 良好实验室规范' },
  { short: 'CAPA', description: 'Corrective and Preventive Action / 纠正与预防措施' },
  { short: 'MSA', description: 'Measurement System Analysis / 测量系统分析' },
  { short: 'APQP', description: 'Advanced Product Quality Planning / 先期产品质量策划' },
  { short: 'PPAP', description: 'Production Part Approval Process / 生产件批准程序' },
  { short: 'OEE', description: 'Overall Equipment Effectiveness / 设备综合效率' },
  { short: 'WIP', description: 'Work In Progress / 在制品' },
  { short: 'ECR', description: 'Engineering Change Request / 工程变更申请' },
  { short: 'ECO', description: 'Engineering Change Order / 工程变更通知单' },

  // energy and environment
  { short: 'CO2', description: 'Carbon Dioxide / 二氧化碳' },
  { short: 'EPC', description: 'Engineering, Procurement and Construction / 设计-采购-施工总承包' },
  { short: 'GWh', description: 'Gigawatt-hour: 1 GWh = 10^3 MWh = 10^6 kWh / 吉瓦时：1 GWh = 10^3 MWh = 10^6 kWh' },
  { short: 'TWh', description: 'Terawatt-hour: 1 TWh = 10^3 GWh = 10^9 kWh / 太瓦时：1 TWh = 10^3 GWh = 10^9 kWh' },
  { short: 'ppb', description: 'parts per billion: concentration unit, 1 ppb = 10^-9 / 十亿分之一：浓度单位，1 ppb = 10^-9' },

  // transport
  { short: 'L2', description: 'Level 2 driving automation: partial driving automation / 二级驾驶自动化：部分自动驾驶' },
  { short: 'L3', description: 'Level 3 driving automation: conditional driving automation / 三级驾驶自动化：有条件自动驾驶' },
  { short: 'L4', description: 'Level 4 driving automation: high driving automation / 四级驾驶自动化：高度自动驾驶' },
  { short: 'L5', description: 'Level 5 driving automation: full driving automation / 五级驾驶自动化：完全自动驾驶' },
]

function toId(short) {
  return short.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function letterFor(short) {
  const first = short[0]
  if (/[0-9]/.test(first)) return first
  if (/[a-z]/i.test(first)) return first.toUpperCase()
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
  const takenIds = new Set()

  for (const g of cloned) {
    for (const item of g.items) {
      byShort.set(item.short.toLowerCase(), item)
      takenIds.add(item.id)
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

    const base = toId(entry.short)
    if (!base) {
      skipped += 1
      continue
    }

    let id = base
    let n = 2
    while (takenIds.has(id)) {
      id = `${base}${n}`
      n += 1
    }

    const letter = letterFor(entry.short)
    if (!byLetter.has(letter)) {
      const group = { letter, items: [] }
      byLetter.set(letter, group)
      cloned.push(group)
    }

    const newItem = { id, short: entry.short, description: entry.description }
    byLetter.get(letter).items.push(newItem)
    byShort.set(key, newItem)
    takenIds.add(id)
    added += 1
  }

  cloned.sort((a, b) => a.letter.localeCompare(b.letter))
  for (const g of cloned) g.items.sort((a, b) => a.id.localeCompare(b.id))
  return { merged: cloned, added, updated, skipped }
}

async function main() {
  const current = await fs.readFile(abbrPath, { encoding: 'utf8' })
  const { merged, added, updated, skipped } = mergeEntries(unsortedAbbrGroups, entries)
  const replacement = renderGroupsAsJs(merged)
  const next = current.replace(/export const unsortedAbbrGroups = \[[\s\S]*?\n\];/, replacement)
  if (next === current) throw new Error('Failed to replace unsortedAbbrGroups block')
  await fs.writeFile(abbrPath, next, { encoding: 'utf8' })
  console.log(JSON.stringify({ requested: entries.length, added, updated, skipped, groups: merged.length }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
