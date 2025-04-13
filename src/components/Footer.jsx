import { motion } from 'motion/react'
import styles from './Footer.module.css'

export function Footer() {
    return (
        <motion.footer
            className={styles.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.footerContent}>
                <div className={styles.footerLeft}>
                    <p className="text">© 2007 - 2025 Minsecrus. All rights reserved.</p>
                </div>
                <div className={styles.footerRight}>
                    <a target='_blank' href="https://github.com/minsecrus" className={`${styles.footerLink} interact`}>
                        GitHub
                    </a>
                    <a href="mailto:minsecrusdreamers@gmail.com" className={`${styles.footerLink} interact`}>
                        Email
                    </a>
                </div>
            </div>
        </motion.footer>
    )
}