import './app.css'
import { NavBar } from './components/NavBar'
import { useState, useEffect, useCallback } from 'react'
import { Toolbox } from './pages/Toolbox'
import { Library } from './pages/Library'
import { Footer } from './components/Footer'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Abbr } from './pages/Abbr'
import { ToastContainer } from './components/Toast'

export function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 3000, anchor = null) => {
    const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev, { id, message, type, duration, anchor }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.history.pushState(null, '', page === 'home' ? '/' : `/${page}`)
  }

  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      if (path === '/about') setCurrentPage('about');
      else if (path === '/abbr') setCurrentPage('abbr');
      else if (path === '/toolbox') setCurrentPage('toolbox');
      else if (path === '/library') setCurrentPage('library');
      else setCurrentPage('home');
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const getToastAnchor = (target) => {
    if (!target?.getBoundingClientRect) return null

    const rect = target.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top,
      bottom: rect.bottom,
    }
  }

  const copyToClipboard = async (text, label, event) => {
    const anchor = getToastAnchor(event?.currentTarget)

    try {
      await navigator.clipboard.writeText(text)
      addToast(`已复制 ${label}`, 'success', 3000, anchor)
    } catch (err) {
      addToast('复制失败，请重试', 'error', 3000, anchor)
    }
  }

  useEffect(() => {
    switch (currentPage) {
      case 'toolbox':
        document.title = 'Minsecrus - 工具箱';
        break;
      case 'library':
        document.title = 'Minsecrus - 资料库';
        break;
      case 'about':
        document.title = 'Minsecrus - 关于本网站';
        break;
      case 'abbr':
        document.title = 'Minsecrus - 缩略词列表';
        break;
      default: // home page
        document.title = 'Minsecrus - 遇见更好的自己';
    }
  }, [currentPage]);


  const renderPage = () => {
    switch (currentPage) {
      case 'toolbox':
        return <Toolbox />;
      case 'library':
        return <Library />;
      case 'abbr':
        return <Abbr />;
      case 'about':
        return <About />;
      default:
        return <Home navigateTo={navigateTo} copyToClipboard={copyToClipboard} />;
    }
  }

  return (
    <>
      <NavBar currentPage={currentPage} navigateTo={navigateTo} />
      {renderPage()}
      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  )
}
