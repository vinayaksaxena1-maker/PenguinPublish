import React from 'react'
import { BookOpen, Users, Truck, LifeBuoy, ShieldCheck } from 'lucide-react'
import { useCMS } from '../lib/useCMS'

const FeatureHighlights: React.FC = () => {
  const { getVal } = useCMS()
  const features = [
    {
      icon: <BookOpen className="w-5 h-5 text-[#F97316]" />,
      title: "Premium Quality",
      desc: "Top-notch printing with the finest paper and materials."
    },
    {
      icon: <Users className="w-5 h-5 text-[#F97316]" />,
      title: "Expert Team",
      desc: "Industry experts working dedicatedly to perfect your book."
    },
    {
      icon: <Truck className="w-5 h-5 text-[#F97316]" />,
      title: "On-time Delivery",
      desc: "Fast and reliable delivery across the globe."
    },
    {
      icon: <LifeBuoy className="w-5 h-5 text-[#F97316]" />,
      title: "Author Support",
      desc: "Dedicated support at every step of your publishing journey."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#F97316]" />,
      title: "100% Satisfaction",
      desc: "We ensure your complete satisfaction always."
    }
  ]

  return (
    <div className="site-container relative z-30 mt-16 mb-12 sm:mb-16">
      
      {/* Premium Section Title */}
      <div className="flex flex-col items-center mb-10 text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-dark)] leading-tight">
          {getVal('home_premium_heading', 'Why Choose MB Publisher?')}
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-3 leading-relaxed">
          {getVal('home_premium_text', 'We offer premium publishing services with a dedicated project manager, complete transparency, and weekly support.')}
        </p>
      </div>

      {/* Dynamic box card support light/dark context */}
      <div className="w-full bg-[var(--bg-secondary)] rounded-[24px] border border-[var(--border-color)] shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden">
        
        {/* Desktop View: 5 Columns with vertical dividers */}
        <div className="hidden lg:flex items-stretch py-10 px-4 bg-[var(--bg-secondary)]">
          {features.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 px-6 py-4 flex flex-col items-start text-left group transition-all duration-300 hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center mb-6 shadow-sm group-hover:border-[#F97316]/50 group-hover:bg-[#F97316]/5 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[var(--text-dark)] mb-2 font-sans tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-[1.6] font-sans">
                  {item.desc}
                </p>
              </div>
              
              {index < features.length - 1 && (
                <div className="w-[1.5px] my-6 bg-[var(--border-color)] self-stretch" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Tablet & Mobile View: Grid layout */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 py-10 px-6 bg-[var(--bg-secondary)]">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-start text-left p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] group hover:border-[#F97316]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center mb-5 shadow-sm group-hover:bg-[#F97316]/5 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-[var(--text-dark)] mb-2 font-sans">
                {item.title}
              </h3>
              <p className="text-[13px] text-[var(--text-muted)] leading-[1.6] font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FeatureHighlights
