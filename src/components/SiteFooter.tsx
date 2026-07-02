import React, { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Social icon SVGs ── */
const FacebookIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const TwitterIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const YouTubeIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#07141E" />
  </svg>
)
const PaperPlaneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

import logoImg from '../assets/Logo1.png'

/* ── Logo mark ── */
const LogoMark = () => (
  <div className="animated-logo-container animated-logo-float" style={{ display: 'inline-block', borderRadius: '6px' }}>
    <img src={logoImg} alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '6px' }} />
  </div>
)

const socials = [
  { label: 'Facebook', icon: <FacebookIcon />, href: 'https://www.facebook.com/share/1Coytp29CD/' },
  { label: 'Instagram', icon: <InstagramIcon />, href: 'https://www.instagram.com/mbp_publishers?igsh=MTBsdm42bnRraWsyZw==' },
  { label: 'Twitter', icon: <TwitterIcon />, href: '#' },
  { label: 'LinkedIn', icon: <LinkedInIcon />, href: '#' },
  { label: 'YouTube', icon: <YouTubeIcon />, href: '#' },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Books', href: '/books' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact' },
]

const SiteFooter: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <>
      {/* ── MAIN FOOTER ── */}
      <footer
        style={{
          backgroundColor: '#07141E',
          paddingTop: '60px',
          paddingBottom: '40px',
          color: '#D1D5DB',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '60px',
          }}
          className="footer-grid site-container"
        >

          {/* ─ COLUMN 1: Brand ─ */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <LogoMark />
              <div>
                <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700, lineHeight: 1, letterSpacing: '1px' }}>MB</div>
                <div style={{ color: '#F97316', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', marginTop: '1px' }}>PUBLISHERS</div>
              </div>
            </div>

            <div style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '2px', color: '#F97316', marginBottom: '14px', textTransform: 'uppercase' }}>
              DIGITAL PUBLICATION
            </div>

            <p style={{ fontSize: '10px', color: '#D1D5DB', lineHeight: 1.7, margin: '0 0 24px 0' }}>
              We help authors turn their ideas into beautifully printed books and reach readers worldwide.
            </p>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    color: '#D1D5DB',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.2s, color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = '#F97316'
                    el.style.color = '#ffffff'
                    el.style.borderColor = '#F97316'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = 'rgba(255,255,255,0.07)'
                    el.style.color = '#D1D5DB'
                    el.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ─ COLUMN 2: Quick Links ─ */}
          <div>
            <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                     to={link.href}
                     style={{
                       fontSize: '10px',
                       color: '#D1D5DB',
                       textDecoration: 'none',
                       display: 'flex',
                       alignItems: 'center',
                       gap: '8px',
                       transition: 'color 0.2s',
                     }}
                     onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#F97316' }}
                     onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D1D5DB' }}
                  >
                    <span style={{ color: '#F97316', fontSize: '12px' }}>&#8250;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ COLUMN 3: Contact Us ─ */}
          <div>
            <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
              Contact Us
            </h3>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <span style={{ color: '#F97316', marginTop: '2px', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a href="tel:+918882942631" style={{ fontSize: '10px', color: '#D1D5DB', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#F97316' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D1D5DB' }}
              >
                +91 88829 42631
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <span style={{ color: '#F97316', marginTop: '2px', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <a href="mailto:info@mbpublishers.com" style={{ fontSize: '10px', color: '#D1D5DB', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#F97316' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D1D5DB' }}
              >
                info@mbpublishers.com
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: '#F97316', marginTop: '2px', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span style={{ fontSize: '10px', color: '#D1D5DB', lineHeight: 1.7 }}>
                D-16 pandav nagar<br />
                near ramleela c- park<br />
                New Delhi, India
              </span>
            </div>
          </div>

          {/* ─ COLUMN 4: Newsletter ─ */}
          <div>
            <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
              Newsletter
            </h3>
            <p style={{ fontSize: '10px', color: '#D1D5DB', lineHeight: 1.7, margin: '0 0 20px 0' }}>
              Subscribe to get updates and publishing tips.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  height: '46px',
                  padding: '0 14px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRight: 'none',
                  borderRadius: '8px 0 0 8px',
                  color: '#ffffff',
                  outline: 'none',
                  minWidth: 0,
                }}
                onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = '#F97316' }}
                onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                style={{
                  height: '46px',
                  width: '46px',
                  backgroundColor: '#F97316',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0 8px 8px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ea6c0a' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F97316' }}
              >
                <PaperPlaneIcon />
              </button>
            </form>
          </div>

        </div>

        {/* Responsive grid styles */}
        <style>{`
          @media (max-width: 1023.98px) {
            .footer-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 40px !important;
            }
          }
          @media (max-width: 767.98px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
            }
          }
        `}</style>
      </footer>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          backgroundColor: '#07141E',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
          className="site-container"
        >
          <span style={{ fontSize: '14px', color: '#9CA3AF' }}>
            &copy; 2026 MB Publisher. All Rights Reserved. | Created By : Innovix
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#9CA3AF' }}>
            <Link to="/privacy" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#F97316' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF' }}
            >
              Privacy Policy
            </Link>
            <span style={{ opacity: 0.4 }}>|</span>
            <Link to="/terms" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#F97316' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF' }}
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SiteFooter
