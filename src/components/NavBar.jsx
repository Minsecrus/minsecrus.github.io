import { useState, useEffect, useRef } from 'react'
import styles from './NavBar.module.css'

export function NavBar({ currentPage, navigateTo }) {
    const [visible, setVisible] = useState(true)


    const prevScrollPos = useRef(window.scrollY)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY
            setVisible(prevScrollPos.current > currentScrollPos || currentScrollPos < 10)
            prevScrollPos.current = currentScrollPos
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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