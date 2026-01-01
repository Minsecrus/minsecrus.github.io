import { useState, useEffect, useRef } from 'react'
import './NavBar.css'

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
        <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <span className="text" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Minsecrus</span>
            <div className="links">
                <a onClick={() => window.open('https://minsecrus.github.io/ZenResume-Generator/', '_blank')} className="interact"
                >
                    ZenResume
                </a>
                <a
                    className={`interact ${currentPage === 'abbr' ? 'active' : ''}`}
                    onClick={() => navigateTo('abbr')}
                    style={{ cursor: 'pointer' }}
                >
                    Abbr
                </a>
                <a
                    className={`interact ${currentPage === 'about' ? 'active' : ''}`}
                    onClick={() => navigateTo('about')}
                    style={{ cursor: 'pointer' }}
                >
                    About
                </a>
            </div>
        </nav>
    )
}
