import { useState, useEffect, useRef } from 'react'
import './NavBar.css'

export function NavBar({ currentPage, navigateTo }) {
    const [visible, setVisible] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)


    const prevScrollPos = useRef(window.scrollY)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY
            setVisible(prevScrollPos.current > currentScrollPos || currentScrollPos < 10)
            prevScrollPos.current = currentScrollPos
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    const handleLinkClick = (page) => {
        navigateTo(page)
        setMenuOpen(false)
    }

    return (
        <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <span className="text" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Minsecrus</span>
            <div className="links">
                <a href="https://minsecrus.github.io/Frontend-Guide/" target="_blank" className="interact desktop-only"
                >
                    Frontend Guide
                </a>
                <a href="https://minsecrus.github.io/CssTellation/" target="_blank" className="interact desktop-only"
                >
                    CssTellation
                </a>
                <a href="https://minsecrus.github.io/ZenResume-Generator/" target="_blank" className="interact desktop-only"
                >
                    ZenResume
                </a>
                <a
                    className={`interact desktop-only ${currentPage === 'abbr' ? 'active' : ''}`}
                    onClick={() => navigateTo('abbr')}
                    style={{ cursor: 'pointer' }}
                >
                    Abbr
                </a>
                <a
                    className={`interact desktop-only ${currentPage === 'about' ? 'active' : ''}`}
                    onClick={() => navigateTo('about')}
                    style={{ cursor: 'pointer' }}
                >
                    About
                </a>
            </div>
            <div className="menu-container" ref={menuRef}>
                <button className="menu-button mobile-only" onClick={handleMenuClick}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </button>
                {menuOpen && (
                    <div className="dropdown-menu mobile-links">

                        <a href="https://minsecrus.github.io/Frontend-Guide/" target="_blank" className="dropdown-item interact"
                        >
                            Frontend Guide
                        </a>
                        <a href="https://minsecrus.github.io/CssTellation/" target="_blank" className="dropdown-item interact"
                        >
                            CssTellation
                        </a>
                        <a href="https://minsecrus.github.io/ZenResume-Generator/" target="_blank" className="dropdown-item interact">
                            ZenResume
                        </a>
                        <a
                            className={`dropdown-item interact ${currentPage === 'abbr' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('abbr')}
                        >
                            Abbr
                        </a>
                        <a
                            className={`dropdown-item interact ${currentPage === 'about' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('about')}
                        >
                            About
                        </a>
                    </div>
                )}
            </div>
        </nav>
    )
}
