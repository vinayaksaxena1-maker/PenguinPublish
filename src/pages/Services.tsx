import React from 'react'
import { Link } from 'react-router-dom'
import { 
  PenTool, 
  Palette, 
  BookOpen, 
  ShieldCheck, 
  Globe, 
  Headphones, 
  Megaphone, 
  Users, 
  Award,
  ChevronRight,
  ArrowRight
} from 'lucide-react'

import about1 from "../assets/about1.jfif"
import CTABanner from "../components/CTABanner"
import SectionHeader from "../components/SectionHeader"
import BooksCarousel from "../components/BooksCarousel"

const Services: React.FC = () => {
  const serviceCards = [
    {
      title: "Editing & Proofreading",
      desc: "Professional editing and proofreading to refine your manuscript to perfection.",
      icon: <PenTool className="w-5 h-5" />
    },
    {
      title: "Book Design",
      desc: "Creative cover design and professional formatting that makes your book stand out.",
      icon: <Palette className="w-5 h-5" />
    },
    {
      title: "Printing",
      desc: "High-quality printing with premium materials and flawless finish.",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "ISBN & Copyright",
      desc: "Complete ISBN registration and copyright support for your book.",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      title: "Global Distribution",
      desc: "We help your book reach readers across global platforms and markets.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Marketing & Promotion",
      desc: "Effective marketing strategies to promote your book and grow your readership.",
      icon: <Megaphone className="w-5 h-5" />
    },
    {
      title: "Author Support",
      desc: "Dedicated support at every step of your publishing journey.",
      icon: <Headphones className="w-5 h-5" />
    },
    {
      title: "Ebook Publishing",
      desc: "Convert your book into digital format for all major eBook platforms.",
      icon: <BookOpen className="w-5 h-5" />
    }
  ]

  const chooseCards = [
    {
      title: "Editorial Excellence",
      desc: "Expert editors ensure your book is polished and professional.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Creative Design",
      desc: "Stunning book covers and interiors that leave a lasting impression.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Premium Printing",
      desc: "Top-notch printing with premium quality materials.",
      icon: <BookOpen className="w-6 h-6" /> // Reused or custom print
    },
    {
      title: "Global Reach",
      desc: "We help your book reach readers across the world.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Dedicated Support",
      desc: "Personal guidance and support throughout your publishing journey.",
      icon: <Headphones className="w-6 h-6" />
    }
  ]

  const stats = [
    { value: "1500+", label: "Happy Authors", icon: <Users className="w-6 h-6 text-[#F97316]" /> },
    { value: "2500+", label: "Books Published", icon: <BookOpen className="w-6 h-6 text-[#F97316]" /> },
    { value: "5+", label: "Years of Excellence", icon: <Award className="w-6 h-6 text-[#F97316]" /> },
    { value: "20+", label: "Countries Reached", icon: <Globe className="w-6 h-6 text-[#F97316]" /> }
  ]

  return (
    <div className="w-full bg-brand-cream text-[#2C2520] overflow-hidden">
      
      {/* ── SECTION 1: SERVICES HERO ── */}
      <section className="relative w-full bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-start border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 md:p-10 bg-[var(--bg-secondary)] shadow-[0_15px_30px_rgba(0,0,0,0.02)] w-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-semibold text-[#F97316] uppercase tracking-widest">
                  OUR SERVICES
                </span>
                <div className="w-8 h-[1.5px] bg-[#F97316]" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[52px] font-serif text-[#132C1F] leading-[1.12] mb-6 font-bold tracking-tight">
                Complete Publishing<br />
                Solutions <span className="text-[#F97316]">For Authors.</span>
              </h1>
              <p className="text-[#665E58] font-sans text-[13px] sm:text-sm mb-8 leading-relaxed max-w-xl">
                From editing to printing and global distribution, we provide end-to-end publishing services to bring your book to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-sans font-semibold text-center rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5"
                >
                  Publish Your Book <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-[#E6E0D5] text-[#132C1F] font-sans font-semibold text-center rounded-xl hover:border-[#132C1F] hover:bg-neutral-50 hover:scale-[1.02] transition-all duration-300 text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5"
                >
                  Consult Our Experts
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div>
              <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-[#E6E0D5]/50">
                <img
                  src={about1}
                  alt="Premium books and typewriter layout"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SERVICES GRID ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Our Publishing Services
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {serviceCards.map((service, index) => (
              <div 
                key={index}
                className="bg-white border border-[#E6E0D5]/50 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[#F97316] mb-4 transition-transform duration-300 group-hover:scale-105">
                    {service.icon}
                  </div>
                  <h3 className="font-sans font-bold text-sm text-[#111827] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#665E58] leading-relaxed mb-4">
                    {service.desc}
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F97316] hover:text-[#ea6c0a] transition-all duration-300 mt-2 font-sans group-hover:translate-x-0.5"
                >
                  Learn More <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR PUBLISHED BOOKS (CAROUSEL) ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          {/* Reusable SectionHeader */}
          <SectionHeader
            label="OUR PORTFOLIO"
            title="Our Published Books"
            description="Explore books successfully published through MB Publisher and discover the stories we helped bring to life."
            linkText="View All Books"
            linkUrl="/books"
          />
          
          {/* Horizontal Slider */}
          <BooksCarousel />
        </div>
      </section>

      {/* ── SECTION 4: WHY AUTHORS CHOOSE US ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Why Authors Choose MB Publisher?
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {chooseCards.map((card, index) => (
              <div 
                key={index}
                className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group"
              >
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                  {card.icon}
                </div>
                <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                  {card.title}
                </h4>
                <p className="text-[11px] text-[#665E58] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: STATISTICS ── */}
      <section className="bg-[#F8F5F1] py-12 lg:py-16 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#132C1F]">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-[#665E58] mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CTA BANNER ── */}
      <CTABanner />

    </div>
  )
}

export default Services
