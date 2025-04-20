import { useState, useEffect } from 'react'
import styles from './NavBar.module.css'

export function NavBar({ currentPage, navigateTo }) {
    const [visible, setVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos])

    return (
        <nav className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}>
            <span className="text" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Minsecrus</span>
            <div className={styles.links}>
                <a
                    className={`interact ${currentPage === 'about' ? styles.active : ''}`}
                    onClick={() => navigateTo('about')}
                    style={{ cursor: 'pointer' }}
                >
                    About
                </a>
            </div>
        </nav>
    )
}