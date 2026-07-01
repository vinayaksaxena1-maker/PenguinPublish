import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import footerBg from '../assets/Footer 2.png'
import { useCMS } from '../lib/useCMS'

const CTABanner: React.FC = () => {
  const { getVal } = useCMS()

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
      className="cta-banner-section border-t border-[var(--border-color)]"
    >
      {/* Dark overlay with linear-gradient for text contrast */}
      <div className="cta-banner-overlay absolute inset-0 z-1" />

      {/* Decorative glow element */}
      <div className="absolute right-[5%] top-[-50px] w-64 h-64 bg-[#F97316]/20 rounded-full blur-[80px] pointer-events-none z-10" />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
        className="cta-banner-inner site-container"
      >
        <div style={{ maxWidth: '520px', width: '100%' }} className="py-8">
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 text-[#FAF7F2] text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse"></span>
            {getVal('cta_label', 'Start Today')}
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '38px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
            }}
            className="cta-banner-heading tracking-tight"
          >
            {getVal('cta_title', 'Ready to Publish Your Book?')}
          </h2>

          <p
            style={{
              fontSize: '14px',
              color: '#E5E7EB',
              lineHeight: 1.6,
              margin: '0 0 28px 0',
              maxWidth: '460px',
            }}
            className="font-sans"
          >
            {getVal('cta_desc', 'Join thousands of authors who have successfully published their books and reached readers worldwide with MB Publisher.')}
          </p>

          <Link
            to="/contact"
            className="btn-premium-orange px-8 py-4 inline-flex items-center gap-2 rounded-xl text-xs font-bold tracking-wider"
            style={{ textDecoration: 'none' }}
          >
            {getVal('cta_button', 'GET STARTED NOW')}
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>

      {/* Responsive height and overlay styles */}
      <style>{`
        .cta-banner-section {
          height: 380px;
        }
        .cta-banner-inner {
          height: 100%;
        }
        .cta-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(7, 20, 30, 0.95) 0%, rgba(7, 20, 30, 0.85) 55%, rgba(7, 20, 30, 0.4) 100%);
          z-index: 1;
        }
        @media (max-width: 1023.98px) {
          .cta-banner-section {
            height: 340px;
          }
        }
        @media (max-width: 767.98px) {
          .cta-banner-overlay {
            background: linear-gradient(180deg, rgba(7, 20, 30, 0.96) 0%, rgba(7, 20, 30, 0.9) 100%) !important;
          }
          .cta-banner-section {
            height: auto !important;
            padding-top: 56px;
            padding-bottom: 56px;
          }
        }
      `}</style>
    </section>
  )
}

export default CTABanner
