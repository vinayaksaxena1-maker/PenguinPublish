import React from 'react'
import { FileText, Edit, Layout, Printer, Globe } from 'lucide-react'

const PublishingProcess: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: <FileText className="w-8 h-8 text-[var(--text-dark)] group-hover:text-[#F97316] transition-colors" />,
      title: "Upload Manuscript",
      desc: "Submit your manuscript and share your ideas with us."
    },
    {
      number: 2,
      icon: <Edit className="w-8 h-8 text-[var(--text-dark)] group-hover:text-[#F97316] transition-colors" />,
      title: "Editing & Proofing",
      desc: "We refine your content for linguistic and layout perfection."
    },
    {
      number: 3,
      icon: <Layout className="w-8 h-8 text-[var(--text-dark)] group-hover:text-[#F97316] transition-colors" />,
      title: "Creative Cover Design",
      desc: "Stunning, customized covers that tell your story visually."
    },
    {
      number: 4,
      icon: <Printer className="w-8 h-8 text-[var(--text-dark)] group-hover:text-[#F97316] transition-colors" />,
      title: "Premium Printing",
      desc: "High-quality hardcovers & paperbacks with custom finishes."
    },
    {
      number: 5,
      icon: <Globe className="w-8 h-8 text-[var(--text-dark)] group-hover:text-[#F97316] transition-colors" />,
      title: "Global Delivery",
      desc: "Distribution to major marketplaces and stores worldwide."
    }
  ]

  return (
    <section className="relative -mt-[10px] lg:-mt-[20px] pt-20 pb-24 lg:pt-28 lg:pb-36 border-b border-[var(--border-color)] overflow-hidden bg-[var(--bg-primary)]">
      
      {/* Background ambient highlights */}
      <div className="absolute right-[-100px] top-[15%] w-[400px] h-[400px] bg-gradient-to-tr from-[rgba(249,115,22,0.1)] to-transparent rounded-full filter blur-[70px] pointer-events-none" />
      <div className="absolute left-[-150px] bottom-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-[rgba(21,62,42,0.15)] to-transparent rounded-full filter blur-[80px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="premium-badge mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
            How it works
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-dark)] leading-tight mt-1">
            Our Publishing Process
          </h2>
          <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-4" />
        </div>

        {/* Desktop View: Horizontal Timeline */}
        <div className="hidden lg:flex items-start justify-between w-full relative px-6 max-w-6xl mx-auto">
          {/* Connector Line behind the circles */}
          <div className="absolute top-[48px] left-[60px] right-[60px] h-[1.5px] bg-[var(--border-color)] z-0" />

          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center w-[180px] relative z-10 group">
              {/* Step Circle */}
              <div className="w-[96px] h-[96px] bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] flex items-center justify-center relative shadow-[0_8px_24px_rgba(0,0,0,0.2)] group-hover:border-[#F97316]/50 group-hover:-translate-y-1 transition-all duration-300">
                <div className="absolute -top-2.5 -right-2.5 w-[24px] h-[24px] rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-dark)] text-[10px] font-bold flex items-center justify-center border border-[var(--border-color)] group-hover:bg-[#F97316] group-hover:text-white transition-colors duration-300">
                  0{item.number}
                </div>
                {item.icon}
              </div>

              {/* Title & Description */}
              <h4 className="text-[15px] font-bold text-[var(--text-dark)] mt-6 mb-2 font-sans group-hover:text-[#F97316] transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-[12px] text-[var(--text-muted)] leading-[1.6] font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tablet View: Grid layout */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto px-4">
          {steps.map((item, index) => (
            <div key={index} className="flex gap-5 items-start bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-2xl relative group hover:border-[#F97316]/50 transition-colors duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
              <div className="w-[72px] h-[72px] rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 relative shadow-sm group-hover:border-[#F97316]/50 transition-colors duration-300">
                <div className="absolute -top-2 -left-2 w-[20px] h-[20px] rounded-md bg-[var(--bg-primary)] text-[var(--text-dark)] text-[9px] font-bold flex items-center justify-center border border-[var(--border-color)]">
                  {item.number}
                </div>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-[14px] font-bold text-[var(--text-dark)] mb-1.5 font-sans group-hover:text-[#F97316] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-[12px] text-[var(--text-muted)] leading-[1.5] font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: 1 Column */}
        <div className="grid grid-cols-1 md:hidden gap-6 max-w-sm mx-auto px-4">
          {steps.map((item, index) => (
            <div key={index} className="flex gap-4 items-start bg-[var(--bg-secondary)] border border-[var(--border-color)] p-5 rounded-2xl relative group hover:border-[#F97316]/50 transition-colors duration-300 shadow-[0_8px_15px_rgba(0,0,0,0.1)]">
              <div className="w-[64px] h-[64px] rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 relative shadow-sm">
                <div className="absolute -top-1.5 -left-1.5 w-[18px] h-[18px] rounded-md bg-[var(--bg-primary)] text-[var(--text-dark)] text-[8px] font-bold flex items-center justify-center border border-[var(--border-color)]">
                  {item.number}
                </div>
                {item.icon}
              </div>
              <div className="flex-grow">
                <h4 className="text-[13px] font-bold text-[var(--text-dark)] mb-1 font-sans group-hover:text-[#F97316] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-[1.5] font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PublishingProcess
