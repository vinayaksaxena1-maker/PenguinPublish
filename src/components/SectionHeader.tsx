import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  label: string;
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  label, 
  title, 
  description, 
  linkText, 
  linkUrl 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      {/* Left side */}
      <div className="flex flex-col items-start max-w-[650px]">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] sm:text-xs font-semibold text-[#F97316] uppercase tracking-widest">
            {label}
          </span>
          <div className="w-8 h-[1.5px] bg-[#F97316]" />
        </div>
        {/* Title */}
        <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] leading-tight mb-3">
          {title}
        </h2>
        {/* Description */}
        <p className="text-xs sm:text-sm text-[#665E58] leading-relaxed font-sans">
          {description}
        </p>
      </div>

      {/* Right side link */}
      {linkText && linkUrl && (
        <div className="flex-shrink-0">
          <Link
            to={linkUrl}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F97316] hover:text-[#ea6c0a] transition-all duration-300 group font-sans"
          >
            {linkText}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default SectionHeader
