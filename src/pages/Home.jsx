import { motion } from 'motion/react'
import { featuredGithubProjects } from '../data/githubProjects'
import '../app.css'

const homeActions = [
    { page: 'toolbox', label: '我的工具箱', className: 'primary-btn' },
    { page: 'library', label: '我的资料库', className: 'secondary-btn' },
]

const interests = [
    {
        title: '读书，读诗',
        descriptions: [
            '莫言，老舍，巴金，沈从文，史铁生；Victor Hugo，Albert Camus，Fyodor Dostoyevsky，Arthur Charles Clarke；李白，杜甫，韩愈，王勃，白居易，李贺，柳永，秦观，贺铸，纳兰性德，仓央嘉措；',
            '《诗经》《楚辞》；《追忆似水年华》《源氏物语》《飘》《沙丘》',
        ],
    },
    {
        title: '沉迷于 Maths & Physics 无法自拔',
        descriptions: [
            '微分几何，泛函分析，凸分析，范畴论；分析力学',
            '学物理就是学美！'
        ],
    },
    {
        title: '计算机真奇妙',
        descriptions: [
            '计算理论，PLT，Web 前后端，Linux，数据结构与算法，计算机网络；',
            'UI/UX 设计，API Design，Technical Writing',
        ],
    },
    {
        title: 'Games ~',
        descriptions: ['原神，Minecraft'],
    },
]

const contacts = [
    { label: '微信', value: 'Minsecrus_dreamers' },
    { label: 'QQ', value: '2972853299' },
    { label: '编程交流群', value: '885719573' },
    { label: '知识脱贫群', value: '1019721429' },
    { label: '邮箱', value: 'minsecrusdreamers@gmail.com' },
]

const sectionMotion = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
}

export function Home({ navigateTo, copyToClipboard }) {
    return (
        <main className="main-content">
            <h2 className="pretitle text">Hi, I'm</h2>
            <h1 className="main-title text">Minsecrus.</h1>
            <h2 className="subtitle interact">- 践行博弈与拟合，倾听愿望与呐喊 -</h2>
            <div className="button-bar">
                {homeActions.map(({ page, label, className }) => (
                    <button
                        key={page}
                        className={`${className} interact`}
                        onClick={() => navigateTo(page)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* 技能展示区 */}
            <motion.section className="skills-section" {...sectionMotion}>
                <h2 className="section-title interact">喜欢的事</h2>
                <div className="skills-grid">
                    {interests.map(({ title, descriptions }, index) => (
                        <motion.div
                            key={title}
                            className="skill-card"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0, transition: { delay: 0.1 * (index + 1) } }}
                            whileHover={{ scale: 1.05, transition: { delay: 0 } }}
                        >
                            <h3 className="interact">{title}</h3>
                            {descriptions.map((description) => (
                                <p key={description} className="skill-desc text">{description}</p>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section className="projects-section" {...sectionMotion}>
                <h2 className="section-title interact">我的 Github</h2>
                <div className="project-grid">
                    {featuredGithubProjects.map(({ id, name, description, href }, index) => (
                        <motion.a
                            key={id}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.2 * (index + 1) } }}
                            whileHover={{ y: -10, transition: { delay: 0 } }}
                        >
                            <div className="project-content">
                                <h3 className="interact">{name}</h3>
                                <p className="text">{description}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.section>

            <motion.section className="contact-section" {...sectionMotion}>
                <h2 className="section-title interact">加个联系方式吧</h2>
                <div className="contact-list">
                    {contacts.map(({ label, value }, index) => (
                        <motion.p
                            key={label}
                            className="contact-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <span className="interact">{label}：</span>
                            <button
                                type="button"
                                className="contact-copy-btn interact"
                                onClick={(event) => copyToClipboard(value, label, event)}
                            >
                                {value}
                            </button>
                        </motion.p>
                    ))}
                </div>
            </motion.section>
        </main>
    )
}
