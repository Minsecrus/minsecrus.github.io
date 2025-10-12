import './app.css'
import { NavBar } from './components/NavBar'
import { useState, useEffect } from 'react'
import { Toolbox } from './pages/Toolbox'
import { Library } from './pages/Library'
import { Footer } from './components/Footer'
import { About } from './pages/About'
import { Home } from './pages/Home'

export function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.history.pushState(null, '', page === 'home' ? '/' : `/${page}`)
  }

  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      if (path === '/about') setCurrentPage('about');
      else if (path === '/toolbox') setCurrentPage('toolbox');
      else if (path === '/library') setCurrentPage('library');
      else setCurrentPage('home');
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const copyToClipboard = async (text, label) => {
    await navigator.clipboard.writeText(text)
    alert(`已复制 ${label}：${text}`)
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
      case 'about':
        return <About />;
      default:
        return <Home />
    }
  }

  return (
    <>
      <NavBar currentPage={currentPage} navigateTo={navigateTo} />
      {renderPage()}
      <Footer />
    </>
  )
}
