import { motion } from 'motion/react'
import './About.css'

export function About() {
    return (
        <div className="about-container">
            <main className="about-main">
                <motion.section
                    className="about-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="about-subtitle interact">Origin</h2>
                    <div className="section-content">
                        <p className="text">整理和分享我在学习过程中收集的各种工具与资源，希望能帮助到大家；</p>
                        <p className="text">也为想用框架和 GitHub Pages 建设网站的小伙伴们提供一定参考。</p>
                    </div>
                </motion.section>
                <motion.section
                    className="about-section"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h2 className="about-subtitle interact">Reference</h2>
                    <div className="section-content">
                        <p className="text">本站制作过程中使用了新兴的前端框架 Preact 和常见动画库 Motion，使用 Vite 进行构建；此外未使用任何库和框架。</p>
                        <p className="text">本站使用 Quicksand 和 HarmonyOS Sans 字体。字体通过 FontSpider 在线工具进行压缩，包含约 4500 个常用汉字。</p>
                        <p className="text interact">如果发现某字的字体无法显示或某个链接没有指向正确的网址，麻烦告诉我一下 ~</p>
                    </div>
                </motion.section>
                <motion.section
                    className="about-section"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <h2 className="about-subtitle interact">Gratitude</h2>
                    <div className="section-content">
                        <p className="text">献给所有无名的人（喜欢毛不易那首歌）；</p>
                        <p className="text">感谢陪伴在我身边的朋友们。</p>
                        <p className="text">Specially Dedicated to my beloved. Y. T. L.</p>
                        <p className="text interact">注定比你少见证 915 次日出日落，可不可以多读 915 本书来弥补呢？</p>
                    </div>
                </motion.section>
                <motion.section
                    className="about-section"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                >
                    <h2 className="about-subtitle interact">友链</h2>
                    <div className="section-content">
                        <div id="links">
                            <a href="https://github.com/zuoliangyu" className="interact">左岚</a>
                            <a href="https://github.com/MalloyManga" className="interact">Malloy</a>
                            <a href="https://github.com/AzidoPP" className="interact">懒羊羊 Tetrazole</a>
                        </div>
                    </div>
                </motion.section>
            </main>
        </div>
    )
}