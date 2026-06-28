import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import logoImg from '../assets/Logo1.png'
import styles from './Nav.module.css'

interface NavProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Nav: React.FC<NavProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <NavLink to="/" className={styles.logoLink} onClick={closeMenu}>
          <div className={styles.logoContainer}>
            <div className="animated-logo-container animated-logo-float">
              <img src={logoImg} alt="MB Publishers Logo" className={styles.logoIcon} style={{ objectFit: 'contain', borderRadius: '6px' }} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>MB</span>
              <span className={styles.logoSubtitle}>PUBLISHERS</span>
            </div>
          </div>
        </NavLink>

        {/* Desktop Links (Center) */}
        <div className={styles.centerLinks}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Home</NavLink>
          <NavLink to="/books" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Books</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>About</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Pricing</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Contact</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Author Portal</NavLink>
        </div>

        {/* Desktop CTA & Theme Toggle (Right) */}
        <div className={styles.rightCta} style={{ gap: '16px' }}>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] text-[var(--text-dark)] transition-colors"
            aria-label="Toggle light/dark theme"
          >
            {theme === 'dark' ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
          </button>
          
          <NavLink to="/contact" className={styles.ctaButton}>
            Publish Your Book
          </NavLink>
        </div>

        {/* Hamburger Button */}
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.mobileLinks}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActiveLink}` : styles.mobileLink} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/books" className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActiveLink}` : styles.mobileLink} onClick={closeMenu}>Books</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActiveLink}` : styles.mobileLink} onClick={closeMenu}>About</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActiveLink}` : styles.mobileLink} onClick={closeMenu}>Pricing</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActiveLink}` : styles.mobileLink} onClick={closeMenu}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActiveLink}` : styles.mobileLink} onClick={closeMenu}>Contact</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActiveLink}` : styles.mobileLink} onClick={closeMenu}>Author Portal</NavLink>
          
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-[var(--border-color)]">
            <span className="text-[13px] text-[var(--text-muted)] font-medium">Switch Theme</span>
            <button
              onClick={() => {
                toggleTheme();
                closeMenu();
              }}
              className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-dark)]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className={styles.mobileCtaWrapper}>
            <NavLink to="/contact" className={styles.mobileCtaButton} onClick={closeMenu}>
              Publish Your Book
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
