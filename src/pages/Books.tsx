import React from 'react'
import BooksGrid from '../components/BooksGrid'
import CTABanner from '../components/CTABanner'
import { useCMS } from '../lib/useCMS'

const Books: React.FC = () => {
  const { getVal } = useCMS()

  return (
    <div className="w-full bg-brand-cream text-[#2C2520] overflow-hidden">
      
      {/* ── SECTION 1: BOOKS HERO ── */}
      <section className="relative w-full bg-gradient-to-b from-white to-[#FAF7F2] pt-16 pb-16 lg:pt-24 lg:pb-20 border-b border-[#E6E0D5]">
        {/* Subtle orange glow blur in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="site-container relative z-10">
          <div className="flex flex-col items-center text-center max-w-[850px] mx-auto">
            {/* Small Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] sm:text-xs font-semibold text-[#F97316] uppercase tracking-widest">
                {getVal('books_portfolio_label', 'OUR PORTFOLIO')}
              </span>
              <div className="w-8 h-[1.5px] bg-[#F97316]" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl font-serif text-[#132C1F] font-bold leading-[1.12] mb-6 tracking-tight">
              {getVal('books_portfolio_title', 'Our Published Books')}
            </h1>
            
            {/* Description */}
            <p className="text-[#665E58] font-sans text-sm sm:text-base leading-relaxed max-w-2xl">
              {getVal('books_portfolio_desc', 'Explore our growing collection of professionally published books across multiple genres and categories.')}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: BOOKS GRID SECTION ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="max-w-6xl mx-auto">
            <BooksGrid />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CTA BANNER ── */}
      <CTABanner />

    </div>
  )
}

export default Books
