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
  // Phase 1: law, policy, economics, finance, education
  { short: 'GDPR', description: 'General Data Protection Regulation: EU data protection law / 通用数据保护条例：欧盟数据保护法规' },
  { short: 'CCPA', description: 'California Consumer Privacy Act: California privacy law / 加州消费者隐私法案：加州隐私法规' },
  { short: 'PIPL', description: 'Personal Information Protection Law: China personal data law / 个人信息保护法：中国个人数据保护法律' },
  { short: 'HIPAA', description: 'Health Insurance Portability and Accountability Act: US health privacy law / 健康保险可携性与责任法案：美国医疗隐私法规' },
  { short: 'FERPA', description: 'Family Educational Rights and Privacy Act: US student records privacy law / 家庭教育权利与隐私法案：美国学生档案隐私法规' },
  { short: 'FOIA', description: 'Freedom of Information Act: public records access law / 信息自由法：政府信息公开获取法规' },
  { short: 'NDA', description: 'Non-Disclosure Agreement: confidentiality contract / 保密协议：约束信息披露的合同' },
  { short: 'MOU', description: 'Memorandum of Understanding: non-binding cooperation memorandum / 谅解备忘录：通常不具法律强制力的合作文件' },
  { short: 'RFP', description: 'Request for Proposal: formal vendor bidding document / 方案征询书：正式采购招标文件' },
  { short: 'RFI', description: 'Request for Information: preliminary supplier information request / 信息征询书：采购前期信息收集文件' },
  { short: 'RFQ', description: 'Request for Quotation: price quotation request / 报价请求书：向供应商征询报价' },
  { short: 'KYC', description: 'Know Your Customer: customer identity verification process / 了解你的客户：客户身份识别流程' },
  { short: 'AML', description: 'Anti-Money Laundering: anti-illicit-funds compliance regime / 反洗钱：打击非法资金流动的合规制度' },
  { short: 'CFT', description: 'Countering the Financing of Terrorism: anti-terror finance controls / 反恐融资：阻断恐怖活动资金渠道的监管体系' },
  { short: 'OFAC', description: 'Office of Foreign Assets Control: US sanctions authority / 外国资产控制办公室：美国制裁管理机构' },
  { short: 'SDG', description: 'Sustainable Development Goals: UN global development agenda / 可持续发展目标：联合国全球发展议程' },
  { short: 'BOT', description: 'Build-Operate-Transfer: infrastructure concession model / 建设-运营-移交：基础设施特许经营模式' },
  { short: 'TOT', description: 'Transfer-Operate-Transfer: asset transfer concession model / 移交-运营-移交：资产转让特许经营模式' },

  { short: 'GNI', description: 'Gross National Income: total income of residents and domestic producers / 国民总收入：本国居民和生产者取得的总收入' },
  { short: 'M0', description: 'Monetary Base: cash in circulation plus bank reserves / 基础货币：流通现金与银行准备金之和' },
  { short: 'M1', description: 'Narrow Money: highly liquid money supply measure / 狭义货币：流动性最高的货币供给口径' },
  { short: 'M2', description: 'Broad Money: broader money supply including time deposits / 广义货币：含定期存款等的货币供给口径' },
  { short: 'CAGR', description: 'Compound Annual Growth Rate: smoothed annual growth metric / 复合年增长率：平滑化年增长指标' },
  { short: 'IRR', description: 'Internal Rate of Return: discount rate making NPV equal zero / 内部收益率：使净现值为零的折现率' },
  { short: 'ROA', description: 'Return on Assets: profit generated per unit of assets / 资产回报率：单位资产创造利润的能力' },
  { short: 'EBIT', description: 'Earnings Before Interest and Taxes / 息税前利润' },
  { short: 'EBITDA', description: 'Earnings Before Interest, Taxes, Depreciation and Amortization / 息税折旧摊销前利润' },
  { short: 'COGS', description: 'Cost of Goods Sold: direct cost of producing sold goods / 销售成本：已售商品的直接成本' },
  { short: 'FIFO', description: 'First In, First Out: inventory cost flow method / 先进先出：存货计价流转方法' },
  { short: 'LIFO', description: 'Last In, First Out: inventory cost flow method / 后进先出：存货计价流转方法' },
  { short: 'GAAP', description: 'Generally Accepted Accounting Principles / 公认会计原则' },
  { short: 'IFRS', description: 'International Financial Reporting Standards / 国际财务报告准则' },
  { short: 'IPO', description: 'Initial Public Offering: first public stock issuance / 首次公开募股：公司首次向公众发行股票' },
  { short: 'SPAC', description: 'Special Purpose Acquisition Company: shell company for mergers / 特殊目的收购公司：用于并购上市的壳公司' },
  { short: 'ETF', description: 'Exchange-Traded Fund: fund traded on exchanges / 交易型开放式指数基金：可在交易所买卖的基金' },
  { short: 'REIT', description: 'Real Estate Investment Trust: income-generating property trust / 房地产投资信托：以不动产收益为基础的信托产品' },
  { short: 'NAV', description: 'Net Asset Value: asset value minus liabilities / 净资产值：资产减负债后的价值' },
  { short: 'AUM', description: 'Assets Under Management: total managed asset value / 管理资产规模：机构受托管理资产总额' },
  { short: 'P2P', description: 'Peer-to-Peer: direct participant-to-participant network or lending model / 点对点：参与者直接连接或借贷模式' },
  { short: 'C2C', description: 'Consumer-to-Consumer: consumer marketplace model / 消费者对消费者：个人之间交易模式' },
  { short: 'D2C', description: 'Direct-to-Consumer: brand sells directly to end users / 直达消费者：品牌直接面向终端用户销售' },

  { short: 'SAT', description: 'Scholastic Assessment Test: US college admission test / 学术能力评估测试：美国大学入学考试' },
  { short: 'IB', description: 'International Baccalaureate: international education curriculum system / 国际文凭课程体系：国际学校常用课程框架' },
  { short: 'IGCSE', description: 'International General Certificate of Secondary Education / 国际中等教育普通证书' },
  { short: 'GCSE', description: 'General Certificate of Secondary Education / 中等教育普通证书' },
  { short: 'LSAT', description: 'Law School Admission Test / 法学院入学考试' },
  { short: 'MCAT', description: 'Medical College Admission Test / 医学院入学考试' },
  { short: 'IELTS', description: 'International English Language Testing System / 国际英语语言测试系统' },
  { short: 'TOEFL', description: 'Test of English as a Foreign Language / 托福：非英语母语者英语能力考试' },
  { short: 'TOEIC', description: 'Test of English for International Communication / 托业：国际交流英语考试' },
  { short: 'PMP', description: 'Project Management Professional: project management certification / 项目管理专业人士认证' },
  { short: 'PRINCE2', description: 'PRojects IN Controlled Environments: project management methodology / 受控环境下项目管理方法论' },
  { short: 'MOOC', description: 'Massive Open Online Course / 大规模开放在线课程' },
  { short: 'STEM', description: 'Science, Technology, Engineering and Mathematics / 科学、技术、工程与数学教育' },
  { short: 'STEAM', description: 'Science, Technology, Engineering, Arts and Mathematics / 科学、技术、工程、艺术与数学教育' },
  { short: 'K12', description: 'Kindergarten through 12th grade education system / K12 教育体系：从幼儿园到高中' },
  { short: 'GPA', description: 'Grade Point Average: average academic score index / 平均绩点：课程成绩加权平均指标' },
  { short: 'CGPA', description: 'Cumulative Grade Point Average / 累计平均绩点' },

  // Phase 2: medical, transport, energy, environment
  { short: 'EHR', description: 'Electronic Health Record: longitudinal digital patient record / 电子健康档案：患者长期数字化医疗记录' },
  { short: 'NICU', description: 'Neonatal Intensive Care Unit / 新生儿重症监护室' },
  { short: 'PICU', description: 'Pediatric Intensive Care Unit / 儿科重症监护室' },
  { short: 'OPD', description: 'Outpatient Department / 门诊部' },
  { short: 'ECG', description: 'Electrocardiogram: heart electrical activity test / 心电图：记录心脏电活动的检查' },
  { short: 'EKG', description: 'Elektrokardiogramm: alternate abbreviation of electrocardiogram / EKG：心电图的另一常见缩写' },
  { short: 'EEG', description: 'Electroencephalogram: brain electrical activity test / 脑电图：记录脑电活动的检查' },
  { short: 'PET', description: 'Positron Emission Tomography / 正电子发射断层扫描' },
  { short: 'PCR', description: 'Polymerase Chain Reaction: DNA amplification method / 聚合酶链式反应：核酸扩增技术' },
  { short: 'RT-PCR', description: 'Reverse Transcription Polymerase Chain Reaction / 逆转录聚合酶链式反应' },
  { short: 'RNA', description: 'Ribonucleic Acid / 核糖核酸' },
  { short: 'mRNA', description: 'messenger RNA: template carrying coding information for protein synthesis / 信使 RNA：携带蛋白质编码信息的模板分子' },
  { short: 'AIDS', description: 'Acquired Immunodeficiency Syndrome / 获得性免疫缺陷综合征' },
  { short: 'HPV', description: 'Human Papillomavirus / 人乳头瘤病毒' },
  { short: 'HCV', description: 'Hepatitis C Virus / 丙型肝炎病毒' },
  { short: 'COPD', description: 'Chronic Obstructive Pulmonary Disease / 慢性阻塞性肺疾病' },
  { short: 'ADHD', description: 'Attention Deficit Hyperactivity Disorder / 注意缺陷多动障碍' },
  { short: 'PTSD', description: 'Post-Traumatic Stress Disorder / 创伤后应激障碍' },
  { short: 'BMR', description: 'Basal Metabolic Rate: energy expenditure at complete rest / 基础代谢率：人体静息状态能量消耗' },
  { short: 'QALY', description: 'Quality-Adjusted Life Year: health outcome utility measure / 质量调整生命年：健康经济学效用指标' },
  { short: 'DALY', description: 'Disability-Adjusted Life Year: burden of disease measure / 伤残调整生命年：疾病负担指标' },
  { short: 'RCT', description: 'Randomized Controlled Trial / 随机对照试验' },
  { short: 'RWE', description: 'Real-World Evidence: clinical evidence from routine practice data / 真实世界证据：来源于真实诊疗场景的数据证据' },
  { short: 'DRG', description: 'Diagnosis-Related Group: hospital reimbursement classification / 诊断相关分组：医保支付分组方式' },
  { short: 'ICD', description: 'International Classification of Diseases / 国际疾病分类' },

  { short: 'IATA', description: 'International Air Transport Association / 国际航空运输协会' },
  { short: 'ICAO', description: 'International Civil Aviation Organization / 国际民用航空组织' },
  { short: 'PNR', description: 'Passenger Name Record: booking record in travel systems / 旅客姓名记录：航空与票务系统订座记录' },
  { short: 'AWB', description: 'Air Waybill: air cargo transport document / 航空运单：航空货运凭证' },
  { short: 'BOL', description: 'Bill of Lading: cargo receipt and transport contract document / 提单：货物收据与运输合同凭证' },
  { short: 'TEU', description: 'Twenty-foot Equivalent Unit: container capacity unit / 标准箱：以 20 英尺集装箱为基准的运力单位' },
  { short: 'FEU', description: 'Forty-foot Equivalent Unit: container capacity unit / 40 英尺箱：集装箱运力单位' },
  { short: 'FCL', description: 'Full Container Load / 整箱运输' },
  { short: 'LCL', description: 'Less than Container Load / 拼箱运输' },
  { short: '3PL', description: 'Third-Party Logistics / 第三方物流' },
  { short: '4PL', description: 'Fourth-Party Logistics / 第四方物流：统筹多家物流资源的集成服务' },
  { short: 'TMS', description: 'Transportation Management System / 运输管理系统' },
  { short: 'WMS', description: 'Warehouse Management System / 仓储管理系统' },
  { short: 'VIN', description: 'Vehicle Identification Number / 车辆识别代码' },
  { short: 'ADAS', description: 'Advanced Driver Assistance Systems / 高级驾驶辅助系统' },
  { short: 'ADS-B', description: 'Automatic Dependent Surveillance-Broadcast / 广播式自动相关监视系统' },
  { short: 'TCAS', description: 'Traffic Collision Avoidance System / 空中防撞系统' },
  { short: 'ILS', description: 'Instrument Landing System / 仪表着陆系统' },
  { short: 'EFB', description: 'Electronic Flight Bag / 电子飞行包' },
  { short: 'AOG', description: 'Aircraft on Ground: aircraft unavailable due to technical issue / 航空器停场：因故障导致飞机无法执飞' },

  { short: 'GHG', description: 'Greenhouse Gas / 温室气体' },
  { short: 'NDC', description: 'Nationally Determined Contribution: country climate commitment under Paris Agreement / 国家自主贡献：巴黎协定下各国气候承诺' },
  { short: 'COP', description: 'Conference of the Parties: UN climate convention summit mechanism / 缔约方大会：联合国气候公约会议机制' },
  { short: 'SBTi', description: 'Science Based Targets initiative / 科学碳目标倡议' },
  { short: 'TCFD', description: 'Task Force on Climate-related Financial Disclosures / 气候相关财务信息披露工作组' },
  { short: 'ISSB', description: 'International Sustainability Standards Board / 国际可持续准则理事会' },
  { short: 'CBAM', description: 'Carbon Border Adjustment Mechanism / 碳边境调节机制' },
  { short: 'ETS', description: 'Emissions Trading System / 排放交易体系' },
  { short: 'MRV', description: 'Measurement, Reporting and Verification / 监测、报告与核查机制' },
  { short: 'REC', description: 'Renewable Energy Certificate / 绿色电力证书' },
  { short: 'RECs', description: 'Renewable Energy Certificates / 可再生能源证书（复数）' },
  { short: 'LCA', description: 'Life Cycle Assessment / 生命周期评价' },
  { short: 'EPCM', description: 'Engineering, Procurement and Construction Management / 设计-采购-施工管理总承包模式' },
  { short: 'BIPV', description: 'Building-Integrated Photovoltaics / 建筑光伏一体化' },
  { short: 'HEV', description: 'Hybrid Electric Vehicle / 混合动力汽车' },
  { short: 'PHEV', description: 'Plug-in Hybrid Electric Vehicle / 插电式混合动力汽车' },
  { short: 'BEV', description: 'Battery Electric Vehicle / 纯电动汽车' },
  { short: 'BMS', description: 'Battery Management System / 电池管理系统' },
  { short: 'CCUS', description: 'Carbon Capture, Utilization and Storage / 碳捕集、利用与封存' },
  { short: 'CNG', description: 'Compressed Natural Gas / 压缩天然气' },
  { short: 'MMBtu', description: 'Million British Thermal Units: energy unit / 百万英热单位：能量单位' },
  { short: 'Brent', description: 'Brent Crude: global benchmark crude oil grade / 布伦特原油：全球基准油种' },

  // Phase 3: culture, media, life, sports
  { short: 'OTT', description: 'Over-The-Top media service: internet-delivered video platform / OTT 媒体服务：通过互联网分发内容的平台' },
  { short: 'VOD', description: 'Video On Demand / 点播视频服务' },
  { short: 'AVOD', description: 'Advertising-Based Video On Demand / 广告支持型视频点播' },
  { short: 'SVOD', description: 'Subscription Video On Demand / 订阅制视频点播' },
  { short: 'AIGC', description: 'AI-Generated Content / 人工智能生成内容' },
  { short: 'MCN', description: 'Multi-Channel Network: creator network organization / 多频道网络机构：内容创作者经纪与运营网络' },
  { short: 'KOL', description: 'Key Opinion Leader / 关键意见领袖' },
  { short: 'KOC', description: 'Key Opinion Consumer / 关键意见消费者' },
  { short: 'CPM', description: 'Cost Per Mille: cost per thousand impressions / 千次展示成本' },
  { short: 'CPC', description: 'Cost Per Click / 按点击付费' },
  { short: 'DAU', description: 'Daily Active Users / 日活跃用户' },
  { short: 'MAU', description: 'Monthly Active Users / 月活跃用户' },
  { short: 'TV', description: 'Television / 电视' },
  { short: 'EP', description: 'Extended Play: short-form music release / 迷你专辑：介于单曲与专辑之间的音乐发行形式' },
  { short: 'LP', description: 'Long Play: full-length music album / 长篇专辑：完整时长音乐专辑' },
  { short: 'DJ', description: 'Disc Jockey: music selector and mixer performer / 唱片骑师：进行音乐选曲与混音的表演者' },
  { short: 'TLDR', description: 'Too Long; Did not Read: short summary marker / 太长不看：用于引出简要总结' },
  { short: 'ASMR', description: 'Autonomous Sensory Meridian Response / 自发性知觉经络反应：常用于舒缓类音视频内容' },
  { short: 'OOTD', description: 'Outfit Of The Day / 今日穿搭' },
  { short: 'IMHO', description: 'In My Humble Opinion / 恕我直言（较谦逊语气）' },
  { short: 'BRB', description: 'Be Right Back / 马上回来' },
  { short: 'AFK', description: 'Away From Keyboard / 暂时离开' },
  { short: 'IRL', description: 'In Real Life / 现实中' },
  { short: 'NSFW', description: 'Not Safe For Work / 不适合在工作场景查看' },

  { short: 'NFL', description: 'National Football League / 国家橄榄球联盟（美式）' },
  { short: 'NHL', description: 'National Hockey League / 国家冰球联盟' },
  { short: 'FIFA', description: 'Fédération Internationale de Football Association / 国际足球联合会' },
  { short: 'UEFA', description: 'Union of European Football Associations / 欧洲足球协会联盟' },
  { short: 'AFC', description: 'Asian Football Confederation / 亚洲足球联合会' },
  { short: 'NFC', description: 'National Football Conference / 国家橄榄球联合会分区（NFL）' },
  { short: 'VAR', description: 'Video Assistant Referee / 视频助理裁判' },
  { short: 'GOAT', description: 'Greatest Of All Time / 历史最佳' },
  { short: 'DNP', description: 'Did Not Play / 未出场' },
  { short: 'DNS', description: 'Did Not Start / 未出发（比赛）' },
  { short: 'DQ', description: 'Disqualified / 取消资格' },
  { short: 'PB', description: 'Personal Best / 个人最好成绩' },
  { short: 'SB', description: 'Season Best / 赛季最好成绩' },
  { short: 'WR', description: 'World Record / 世界纪录' },
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
