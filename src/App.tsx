import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import Nav from './components/Nav'
import SiteFooter from './components/SiteFooter'
import SubscriptionPopup from './components/SubscriptionPopup'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Books from './pages/Books'

import Dashboard from './pages/Dashboard'

// Scroll to top on navigation component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Static Privacy Policy Page
const PrivacyPolicy: React.FC = () => (
  <div className="site-container py-24 max-w-4xl mx-auto min-h-[50vh] flex flex-col justify-center">
    <h1 className="text-3xl font-serif font-bold mb-6 text-[var(--text-dark)]">Privacy Policy</h1>
    <p className="text-[var(--text-muted)] leading-relaxed mb-4 text-sm sm:text-base">
      At MB Publisher, we value your privacy. We collect information to provide better services, such as manuscript submissions, book printing coordination, and distribution logistics.
    </p>
    <p className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base">
      Your content and files remain 100% your intellectual property. We do not sell or share your manuscript with external third parties without your explicit prior written consent.
    </p>
  </div>
)

// Static Terms & Conditions Page
const TermsConditions: React.FC = () => (
  <div className="site-container py-24 max-w-4xl mx-auto min-h-[50vh] flex flex-col justify-center">
    <h1 className="text-3xl font-serif font-bold mb-6 text-[var(--text-dark)]">Terms & Conditions</h1>
    <p className="text-[var(--text-muted)] leading-relaxed mb-4 text-sm sm:text-base">
      By accessing the MB Publisher website or using our publishing, editing, and distribution services, you agree to comply with our Terms of Service.
    </p>
    <p className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base">
      All rights to submitted manuscripts remain with the respective authors. Our services are provided under custom publishing agreements tailored to each project's specifications.
    </p>
  </div>
)

const App: React.FC = () => {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  // Default theme is dark mode, user can toggle light mode
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as 'dark' | 'light') || 'dark'
  })

  useEffect(() => {
    const body = document.body
    if (theme === 'light') {
      body.classList.add('light-theme')
    } else {
      body.classList.remove('light-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-dark)] transition-colors duration-300">
      <ScrollToTop />
      {!isDashboard && <TopBar />}
      {!isDashboard && <Nav theme={theme} toggleTheme={toggleTheme} />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboard && <SiteFooter />}
      {/* Glossy popup shown after delay to prompt subscription */}
      {!isDashboard && <SubscriptionPopup />}
    </div>
  )
}

export default App
