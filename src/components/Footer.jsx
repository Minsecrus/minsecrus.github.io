import { motion } from 'motion/react'
import './Footer.css'

export function Footer() {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="footerContent">
                <div className="footerLeft">
                    <p className="text"> <span id="copyleft">©</span> 2007 - 2025 Minsecrus. All rights reserved.</p>
                </div>
                <div className="footerRight">
                    <a target='_blank' href="https://github.com/minsecrus" className="footerLink interact">
                        GitHub
                    </a>
                    <a href="mailto:minsecrusdreamers@gmail.com" className="footerLink interact">
                        Email
                    </a>
                </div>
            </div>
        </motion.footer>
    )
}
