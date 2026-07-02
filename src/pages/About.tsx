import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Target, 
  Eye, 
  PenTool, 
  Palette, 
  BookOpen, 
  ShieldCheck, 
  Globe
} from 'lucide-react'

import about1 from "../assets/about1.jfif"
import about2 from "../assets/about2.jfif"
import CTABanner from "../components/CTABanner"
import { useCMS } from '../lib/useCMS'
import { supabase } from '../lib/supabaseClient'
import { useDocumentMetadata } from '../hooks/useDocumentMetadata'

interface TeamMember {
  id: number
  name: string
  role: string
  description: string | null
  image_url: string | null
}

// Inline SVG social icons for compatibility and consistent rendering
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const About: React.FC = () => {
  const { getVal } = useCMS()

  useDocumentMetadata({
    title: getVal('about_seo_title', 'Best Self-Publishing Company for New Authors in Delhi | About MB Publisher'),
    description: getVal('about_seo_desc', 'MB Publisher, a New Delhi-based book publishing agency, is the best self-publishing company for new authors. We assist with manuscript editing, proofreading, professional cover design, and global distribution.'),
    ogImage: getVal('about_seo_image', '')
  })

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('id', { ascending: true })

        if (!error && data && data.length > 0) {
          setTeamMembers(data)
        }
      } catch (err) {
        console.error("Error fetching team members:", err)
      }
    }
    fetchTeam()
  }, [])

  const defaultTeam = [
    {
      id: 1,
      name: "Suresh Patel",
      role: "Editorial Director",
      description: "15+ years of experience in editing and publishing.",
      image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      id: 2,
      name: "Ananya Roy",
      role: "Creative Design Lead",
      description: "Expert in book cover design and layout artistry.",
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "Publishing Consultant",
      description: "Guiding authors through every step of publishing.",
      image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80"
    }
  ]

  const teamList = teamMembers.length > 0 ? teamMembers : defaultTeam

  const steps = [
    {
      number: 1,
      icon: (
        <svg className="w-[42px] h-[42px] text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-6" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
      ),
      title: "Manuscript Submission",
      desc: "Submit your manuscript and share your ideas."
    },
    {
      number: 2,
      icon: (
        <svg className="w-[42px] h-[42px] text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      ),
      title: "Editing & Proofreading",
      desc: "We refine your content for perfection."
    },
    {
      number: 3,
      icon: (
        <svg className="w-[42px] h-[42px] text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.52 22 22 17.52 22 12C22 5.5 16.5 2 12 2C6.5 2 2 6.5 2 12C2 15 3.5 17.5 5.5 19.5C6.5 20.5 6 22 4 22C3.5 22 2.5 21.5 2 21" />
          <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
          <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
        </svg>
      ),
      title: "Cover Design",
      desc: "Stunning covers that represent your story."
    },
    {
      number: 4,
      icon: (
        <svg className="w-[42px] h-[42px] text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      ),
      title: "Printing",
      desc: "High-quality printing with premium materials."
    },
    {
      number: 5,
      icon: (
        <svg className="w-[42px] h-[42px] text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      ),
      title: "Distribution",
      desc: "Books delivered to your readers worldwide."
    }
  ]

  return (
    <div className="w-full bg-brand-cream text-[#2C2520] overflow-hidden">
      
      {/* ── SECTION 1: ABOUT HERO ── */}
      <section className="relative w-full bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-start border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 md:p-10 bg-[var(--bg-secondary)] shadow-[0_15px_30px_rgba(0,0,0,0.02)] w-full">
              {/* Small Orange Label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-semibold text-[#F97316] uppercase tracking-widest">
                  {getVal('about_hero_sub', 'ABOUT MB PUBLISHER')}
                </span>
                <div className="w-8 h-[1.5px] bg-[#F97316]" />
              </div>
              
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[52px] font-serif text-[#132C1F] leading-[1.12] mb-6 font-bold tracking-tight">
                {getVal('about_hero_heading', 'Helping Authors Transform Ideas Into Published Success.')}
              </h1>
              
              {/* Description */}
              <p className="text-[#665E58] font-sans text-[13px] sm:text-sm mb-8 leading-relaxed max-w-xl">
                {getVal('about_hero_desc', 'MB Publisher helps authors bring their stories to life through professional editing, premium printing, creative design, ISBN support, and global distribution.')}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-sans font-semibold text-center rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg text-[10px] tracking-wider uppercase"
                >
                  {getVal('about_hero_button', 'Start Your Publishing Journey')}
                </Link>
                <Link
                  to="/services"
                  className="px-6 py-3 border border-[#E6E0D5] text-[#132C1F] font-sans font-semibold text-center rounded-xl hover:border-[#132C1F] hover:bg-neutral-50 hover:scale-[1.02] transition-all duration-300 text-[10px] tracking-wider uppercase"
                >
                  Our Services
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div>
              <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-[#E6E0D5]/50">
                <img
                  src={getVal('about_hero_image', about1)}
                  alt="Premium book publisher workshop"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── SECTION 2: OUR STORY ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              {getVal('about_story_heading', 'Our Story')}
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div>
              <div className="relative w-full h-[260px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-[#E6E0D5]/50">
                <img
                  src={getVal('about_story_image', about2)}
                  alt="Cozy writing room with typewriter and bookshelf"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
            {/* Right Content */}
            <div className="flex flex-col justify-center">
              <p className="text-[#665E58] font-sans text-[13px] sm:text-sm leading-relaxed mb-4 whitespace-pre-line">
                {getVal('about_story_desc', 'MB Publisher was founded with a mission to help aspiring and professional authors publish high-quality books with confidence. We combine editorial expertise, creative design, premium printing, and strategic distribution to ensure every book reaches its full potential.')}
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── SECTION 3: MISSION & VISION ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: Mission */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-start group">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#111827] mb-3">
                {getVal('about_mission_heading', 'Our Mission')}
              </h3>
              <p className="text-[#665E58] font-sans text-[13px] sm:text-sm leading-relaxed">
                {getVal('about_mission_desc', 'To empower authors by providing world-class publishing services and helping their stories reach readers worldwide.')}
              </p>
            </div>
            
            {/* Card 2: Vision */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-start group">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#111827] mb-3">
                Our Vision
              </h3>
              <p className="text-[#665E58] font-sans text-[13px] sm:text-sm leading-relaxed">
                To become the most trusted publishing partner for authors seeking excellence, creativity, and global reach.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY CHOOSE MB PUBLISHER ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              {getVal('about_choose_heading', 'Why Choose MB Publisher?')}
            </h2>
            <p className="text-sm text-[#665E58] text-center mt-3 max-w-xl">
              {getVal('about_choose_desc', 'We stand for quality, dedication, and complete transparency at every milestone.')}
            </p>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* 5 Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <PenTool className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Editorial Excellence
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                Professional editing and proofreading.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Creative Design
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                Eye-catching cover and interior design.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Premium Printing
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                High-quality printing with premium materials.
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                ISBN & Copyright
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                Complete publishing compliance support.
              </p>
            </div>
            
            {/* Card 5 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Global Distribution
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                Reach readers across multiple platforms.
              </p>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ── SECTION 5: MEET OUR TEAM ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Meet Our Team
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamList.map((member) => (
              <div key={member.id} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 p-6 bg-white border border-[#E6E0D5]/50 rounded-2xl shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 group">
                <img
                  src={member.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0 border border-[#E6E0D5]/50 shadow-sm animate-fade-in"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#111827] leading-tight">{member.name}</h3>
                  <p className="text-[10px] font-semibold text-[#F97316] uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                  <p className="text-[12px] text-[#665E58] mt-2.5 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex justify-center sm:justify-start gap-3 mt-4 text-[#665E58]">
                    <a href="#" className="hover:text-[#F97316] transition-colors"><FacebookIcon className="w-4 h-4" /></a>
                    <a href="#" className="hover:text-[#F97316] transition-colors"><TwitterIcon className="w-4 h-4" /></a>
                    <a href="#" className="hover:text-[#F97316] transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PUBLISHING JOURNEY ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              {getVal('about_journey_heading', 'Our Publishing Journey')}
            </h2>
            <p className="text-sm text-[#665E58] text-center mt-3 max-w-xl">
              {getVal('about_journey_desc', 'From initial review to bookstore launch, here is how we bring your book to life.')}
            </p>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* Desktop View: Horizontal Timeline */}
          <div className="hidden lg:flex items-start justify-between w-full relative px-4 max-w-6xl mx-auto">
            {steps.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center w-[180px] relative z-10">
                  <div className="w-[100px] h-[100px] bg-[#F8F5F1] rounded-full border border-[#E6E0D5] flex items-center justify-center relative shadow-sm hover:border-[#F97316] transition-all duration-300">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#F97316] text-white text-[10px] font-semibold flex items-center justify-center shadow-sm">
                      {item.number}
                    </div>
                    {item.icon}
                  </div>
                  <h4 className="text-[13px] font-bold text-[#111827] mt-4 mb-1 font-sans">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#665E58] leading-[1.6] font-sans max-w-[170px]">
                    {item.desc}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-grow h-[1.5px] bg-[#E7C8A0] self-start mt-[50px] mx-2 relative flex items-center justify-center">
                    <div className="absolute bg-white px-1.5 py-0.5 flex items-center justify-center rounded-md border border-[#E6E0D5]/40">
                      <svg className="w-[20px] h-[20px] text-[#E7C8A0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="8 4 16 12 8 20" />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Tablet View: Grid layout */}
          <div className="hidden md:grid lg:hidden grid-cols-3 gap-x-8 gap-y-12 max-w-4xl mx-auto px-4">
            {steps.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white pt-6 pb-5 px-5 rounded-2xl border border-[#E6E0D5]/50 relative shadow-sm">
                <div className="w-[100px] h-[100px] bg-[#F8F5F1] rounded-full border border-[#E6E0D5] flex items-center justify-center relative shadow-sm">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#F97316] text-white text-[10px] font-semibold flex items-center justify-center shadow-sm">
                    {item.number}
                  </div>
                  {item.icon}
                </div>
                <h4 className="text-[13px] font-bold text-[#111827] mt-4 mb-1 font-sans">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#665E58] leading-[1.6] font-sans max-w-[220px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile View: 1 Column (Vertical Timeline) */}
          <div className="grid grid-cols-1 md:hidden gap-10 max-w-sm mx-auto">
            {steps.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white pt-6 pb-5 px-4 rounded-xl border border-[#E6E0D5]/40 relative shadow-sm">
                <div className="w-[100px] h-[100px] bg-[#F8F5F1] rounded-full border border-[#E6E0D5] flex items-center justify-center relative shadow-sm">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#F97316] text-white text-[10px] font-semibold flex items-center justify-center shadow-sm">
                    {item.number}
                  </div>
                  {item.icon}
                </div>
                <h4 className="text-[13px] font-bold text-[#111827] mt-4 mb-1 font-sans">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#665E58] leading-[1.6] font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ── SECTION 7: TESTIMONIALS ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Trusted By Thousands Of Authors
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Dynamic Testimonial 1 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div>
                {/* Quote Icon */}
                <svg className="w-6 h-6 text-[#F97316] mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {/* Testimonial Text */}
                <p className="text-[12px] sm:text-[13px] font-medium text-[#374151] leading-[1.6] font-sans italic mb-6">
                  {getVal('about_trusted_quote', '"MB publishers made my dream come true. Their professionalism, quality, and support are unmatched."')}
                </p>
              </div>

              {/* Author Area */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#F3F4F6]">
                <img
                  src={getVal('about_trusted_image', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80')}
                  alt={getVal('about_trusted_name', 'Ritika Sharma')}
                  className="w-12 h-12 rounded-full object-cover border border-[#E6E0D5]/50 shadow-sm flex-shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-bold text-[#111827] leading-none">
                    {getVal('about_trusted_name', 'Ritika Sharma')}
                  </span>
                  <span className="text-[10px] font-semibold text-[#6B7280] mt-1 leading-none">
                    Author
                  </span>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mt-2.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F97316] text-[12px] leading-none">&#9733;</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div>
                {/* Quote Icon */}
                <svg className="w-6 h-6 text-[#F97316] mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {/* Testimonial Text */}
                <p className="text-[12px] sm:text-[13px] font-medium text-[#374151] leading-[1.6] font-sans italic mb-6">
                  "From editing to printing, everything was handled perfectly. Highly recommended for every author."
                </p>
              </div>

              {/* Author Area */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#F3F4F6]">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Arjun Mehta"
                  className="w-12 h-12 rounded-full object-cover border border-[#E6E0D5]/50 shadow-sm flex-shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-bold text-[#111827] leading-none">
                    Arjun Mehta
                  </span>
                  <span className="text-[10px] font-semibold text-[#6B7280] mt-1 leading-none">
                    Author
                  </span>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mt-2.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F97316] text-[12px] leading-none">&#9733;</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div>
                {/* Quote Icon */}
                <svg className="w-6 h-6 text-[#F97316] mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {/* Testimonial Text */}
                <p className="text-[12px] sm:text-[13px] font-medium text-[#374151] leading-[1.6] font-sans italic mb-6">
                  "The print quality is exceptional and their team is very cooperative throughout the process."
                </p>
              </div>

              {/* Author Area */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#F3F4F6]">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Neel Iyer"
                  className="w-12 h-12 rounded-full object-cover border border-[#E6E0D5]/50 shadow-sm flex-shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-bold text-[#111827] leading-none">
                    Neel Iyer
                  </span>
                  <span className="text-[10px] font-semibold text-[#6B7280] mt-1 leading-none">
                    Author
                  </span>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mt-2.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F97316] text-[12px] leading-none">&#9733;</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ── SECTION 8: CTA BANNER ── */}
      <CTABanner />

    </div>
  )
}

export default About
