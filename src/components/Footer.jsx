import { motion } from 'motion/react'
import './Footer.css'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="footer-content">
                <div className="footer-left">
                    <p className="text"> <span id="copyleft">©</span> 2007 - {currentYear} Minsecrus. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <a target='_blank' href="https://github.com/minsecrus" className="footer-link interact">
                        GitHub
                    </a>
                    <a href="mailto:minsecrusdreamers@gmail.com" className="footer-link interact">
                        Email
                    </a>
                </div>
            </div>
        </motion.footer>
    )
}
