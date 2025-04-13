import { motion } from 'motion/react'
import styles from './About.module.css'

export function About() {
    return (
        <div className={styles.aboutContainer}>
            <main className={styles.aboutMain}>
                <motion.section
                    className={styles.purposeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="subtitle interact">Origin</h2>
                    <div className={styles.sectionContent}>
                        <p className="text">整理和分享我在学习过程中收集的各种工具与资源。</p>
                        <p className="text">希望能帮助到大家。</p>
                        <p className="text"><a href="https://space.bilibili.com/27619688">左岚</a>不做官网，我做（乐）</p>
                    </div>
                </motion.section>

                <motion.section
                    className={styles.dedicationSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h2 className="subtitle interact">Others</h2>
                    <div className={styles.sectionContent}>
                        <p className="text">献给所有无名的人</p>
                        <p className="text">Specially Dedicated to my beloved. Y. T. L.</p>
                    </div>
                </motion.section>
            </main>
        </div>
    )
}