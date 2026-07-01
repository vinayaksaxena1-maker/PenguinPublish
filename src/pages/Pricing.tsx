import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Check, 
  ChevronDown, 
  BookOpen, 
  Palette, 
  Globe, 
  Headphones, 
  Users,
  Award,
  ArrowRight,
  Phone
} from 'lucide-react'

import about1 from "../assets/about1.jfif"
import CTABanner from "../components/CTABanner"
import { useCMS } from '../lib/useCMS'
import { supabase } from '../lib/supabaseClient'
import { useDocumentMetadata } from '../hooks/useDocumentMetadata'

interface PricingPlan {
  id: number
  name: string
  price: string
  points: string
  button_text: string | null
}

interface FaqItem {
  id: number
  question: string
  answer: string
}

// Custom orange check icon component
const OrangeCheck = () => (
  <div className="w-4.5 h-4.5 rounded-full bg-orange-50 flex items-center justify-center text-[#F97316] flex-shrink-0">
    <Check className="w-3 h-3" strokeWidth={3} />
  </div>
)

const Pricing: React.FC = () => {
  const { getVal } = useCMS()

  useDocumentMetadata({
    title: getVal('pricing_seo_title', 'Affordable Publishing Packages for Indian Authors | MB Publisher'),
    description: getVal('pricing_seo_desc', 'Compare affordable self-publishing packages and plans. We offer customized hardback and paperback printing, manuscript formatting, ISBN support, and 100% royalties.'),
    ogImage: getVal('pricing_seo_image', '')
  })

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [dbPlans, setDbPlans] = useState<PricingPlan[]>([])
  const [dbFaqs, setDbFaqs] = useState<FaqItem[]>([])

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing_plans')
          .select('*')
          .order('id', { ascending: true })

        if (!error && data && data.length > 0) {
          setDbPlans(data)
        }
      } catch (err) {
        console.error("Error fetching pricing plans:", err)
      }
    }
    const fetchFaqs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('id', { ascending: true })

        if (!error && data && data.length > 0) {
          setDbFaqs(data)
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err)
      }
    }
    fetchPlans()
    fetchFaqs()
  }, [])

  const defaultPlans = [
    {
      name: "BRONZE",
      price: "₹9,999",
      features: [
        "Basic Manuscript Review",
        "ISBN Assistance",
        "Basic Cover Design",
        "Interior Formatting",
        "10 Author Copies",
        "Email Support"
      ],
      buttonText: "Choose Bronze",
      popular: false,
      premium: false
    },
    {
      name: "SILVER",
      price: "₹19,999",
      features: [
        "Professional Editing",
        "Premium Cover Design",
        "ISBN & Copyright Support",
        "Interior Formatting",
        "25 Author Copies",
        "Marketing Consultation",
        "Priority Support"
      ],
      buttonText: "Choose Silver",
      popular: true,
      premium: false
    },
    {
      name: "GOLD",
      price: "₹39,999",
      features: [
        "Advanced Editing",
        "Premium Cover Design",
        "ISBN & Copyright",
        "Book Listing Assistance",
        "50 Author Copies",
        "Social Media Promotion",
        "Author Branding Support",
        "Priority Publishing"
      ],
      buttonText: "Choose Gold",
      popular: false,
      premium: false
    },
    {
      name: "DIAMOND",
      price: "₹79,999",
      features: [
        "Complete Publishing Solution",
        "Professional Editing",
        "Premium Cover Design",
        "ISBN & Copyright",
        "Global Distribution Assistance",
        "100 Author Copies",
        "Dedicated Publishing Manager",
        "Marketing Campaign Support",
        "Personal Consultation"
      ],
      buttonText: "Choose Diamond",
      popular: false,
      premium: true
    }
  ]

  const plansToRender = dbPlans.length > 0 ? dbPlans.map((dp, idx) => ({
    name: dp.name,
    price: dp.price,
    features: dp.points.split('\n').filter(Boolean).map(p => p.trim()),
    buttonText: dp.button_text || `Choose ${dp.name}`,
    popular: idx === 1,
    premium: idx === dbPlans.length - 1
  })) : defaultPlans

  const defaultFaqs = [
    {
      question: "How long does publishing take?",
      answer: "Typically, the publishing process takes 4-8 weeks, depending on the complexity of the editing and design stages."
    },
    {
      question: "Can I upgrade later?",
      answer: "Yes, you can upgrade your plan at any stage of the publishing journey by paying the difference."
    },
    {
      question: "Do you provide ISBN?",
      answer: "Yes, we provide official ISBN registration and copyright guidance in all our packages."
    },
    {
      question: "Do you offer marketing services?",
      answer: "Yes, our Gold and Diamond plans include social media and marketing campaign support. We also offer standalone marketing services."
    },
    {
      question: "Do you print author copies?",
      answer: "Yes, physical copies are included with all plans (ranging from 10 to 100 copies), printed with premium paper and materials."
    }
  ]

  const faqsToRender = dbFaqs.length > 0 ? dbFaqs.map(df => ({
    question: df.question,
    answer: df.answer
  })) : defaultFaqs

  const chooseCards = [
    {
      title: "Editorial Excellence",
      desc: "Top-notch editing and proofreading by industry experts.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Creative Design",
      desc: "Stunning book covers and interior layouts that stand out.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Premium Printing",
      desc: "High-quality printing with premium paper and finishing.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Global Reach",
      desc: "Distribution across leading platforms and global bookstores.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Dedicated Support",
      desc: "Personal assistance from our team at every step of your journey.",
      icon: <Headphones className="w-6 h-6" />
    }
  ]

  return (
    <div className="w-full bg-brand-cream text-[#2C2520] overflow-hidden">
      
      {/* ── SECTION 1: PRICING HERO ── */}
      <section className="relative w-full bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side */}
            <div className="flex flex-col items-start">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-semibold text-[#F97316] uppercase tracking-widest">
                  {getVal('pricing_hero_sub', 'AFFORDABLE PUBLISHING PACKAGES')}
                </span>
                <div className="w-8 h-[1.5px] bg-[#F97316]" />
              </div>
              
              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[52px] font-serif text-[#132C1F] leading-[1.12] mb-6 font-bold tracking-tight">
                {getVal('pricing_hero_heading', 'Choose The Perfect Publishing Plan For Your Book.')}
              </h1>
              
              {/* Description */}
              <p className="text-[#665E58] font-sans text-[13px] sm:text-sm mb-8 leading-relaxed max-w-xl">
                {getVal('pricing_hero_desc', 'Whether you\'re a first-time author or an established writer, MB Publisher offers flexible publishing packages tailored to your goals and budget.')}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-sans font-semibold text-center rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg text-[10px] tracking-wider uppercase"
                >
                  {getVal('pricing_hero_button', 'Get Free Consultation')}
                </Link>
                <a
                  href="#compare-plans"
                  className="px-6 py-3 border border-[#E6E0D5] text-[#132C1F] font-sans font-semibold text-center rounded-xl hover:border-[#132C1F] hover:bg-neutral-50 hover:scale-[1.02] transition-all duration-300 text-[10px] tracking-wider uppercase"
                >
                  Compare Plans
                </a>
              </div>
            </div>
            
            {/* Right Side */}
            <div>
              <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-[#E6E0D5]/50">
                <img
                  src={getVal('pricing_hero_image', about1)}
                  alt="Cozy workspace with books, typewriter and coffee mug"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PRICING TABLES ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              {getVal('pricing_pack_heading', 'Publishing Packages')}
            </h2>
            <p className="text-xs sm:text-sm text-[#665E58] font-sans text-center mt-3 max-w-lg">
              {getVal('pricing_pack_desc', 'Select the package that best fits your publishing journey.')}
            </p>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {plansToRender.map((plan, index) => {
              // Determine card border & shadow styles
              let cardClass = "bg-white flex flex-col justify-between p-6 sm:p-8 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.05)] relative "
              
              if (plan.popular) {
                cardClass += "border-2 border-[#F97316]"
              } else if (plan.premium) {
                cardClass += "border-2 border-[#D4AF37]"
              } else {
                cardClass += "border border-[#E6E0D5]/60"
              }

              return (
                <div key={index} className={cardClass}>
                  {/* Badges */}
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#F97316] text-white text-[8px] font-bold tracking-widest uppercase rounded-full shadow-sm">
                      MOST POPULAR
                    </span>
                  )}
                  {plan.premium && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#D4AF37] text-white text-[8px] font-bold tracking-widest uppercase rounded-full shadow-sm">
                      PREMIUM PACKAGE
                    </span>
                  )}
                  
                  <div>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-bold text-[#665E58] tracking-widest uppercase block mb-2">
                        {plan.name}
                      </span>
                      <div className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-dark)]">
                        {plan.price}
                      </div>
                      <div className="w-8 h-[1.5px] bg-[#E6E0D5] mx-auto mt-4" />
                    </div>
                    
                    {/* Feature list */}
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[11px] sm:text-xs text-[#665E58] leading-relaxed">
                          <OrangeCheck />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Button */}
                  <Link
                    to="/contact"
                    className={`w-full py-2.5 px-4 rounded-xl font-sans font-semibold text-center text-[10px] tracking-wider uppercase transition-all duration-300 block ${
                      plan.popular || plan.premium
                        ? "bg-[#F97316] hover:bg-[#ea6c0a] text-white hover:scale-[1.01] hover:shadow-md"
                        : "border border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white"
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              )
            })}
          </div>
          
        </div>
      </section>

      {/* ── SECTION 3: PACKAGE COMPARISON ── */}
      <section id="compare-plans" className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              {getVal('pricing_compare_heading', 'Compare All Plans')}
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* Comparison Table */}
          <div className="max-w-6xl mx-auto overflow-x-auto shadow-sm rounded-xl border border-[#E6E0D5]/50 bg-white">
            <table className="w-full min-w-[800px] border-collapse text-left font-sans text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E6E0D5]">
                  <th className="p-4 sm:p-5 font-bold text-[#111827] uppercase tracking-wider w-[24%]">FEATURES</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-white bg-[#8B5E3C] w-[19%] uppercase tracking-wider">BRONZE</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-white bg-[#6A7B83] w-[19%] uppercase tracking-wider">SILVER</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-white bg-[#D4AF37] w-[19%] uppercase tracking-wider">GOLD</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-white bg-[#D95F2A] w-[19%] uppercase tracking-wider">DIAMOND</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E0D5]/40 text-[#665E58]">
                {/* Editing */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Editing</td>
                  <td className="p-4 sm:p-5 text-center">Basic Review</td>
                  <td className="p-4 sm:p-5 text-center">Professional Editing</td>
                  <td className="p-4 sm:p-5 text-center">Advanced Editing</td>
                  <td className="p-4 sm:p-5 text-center">Professional Editing</td>
                </tr>
                {/* Cover Design */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Cover Design</td>
                  <td className="p-4 sm:p-5 text-center">Basic</td>
                  <td className="p-4 sm:p-5 text-center">Premium</td>
                  <td className="p-4 sm:p-5 text-center">Premium</td>
                  <td className="p-4 sm:p-5 text-center">Premium</td>
                </tr>
                {/* ISBN Support */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">ISBN Support</td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                </tr>
                {/* Copyright Support */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Copyright Support</td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                </tr>
                {/* Author Copies */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Author Copies</td>
                  <td className="p-4 sm:p-5 text-center">10 Copies</td>
                  <td className="p-4 sm:p-5 text-center">25 Copies</td>
                  <td className="p-4 sm:p-5 text-center">50 Copies</td>
                  <td className="p-4 sm:p-5 text-center">100 Copies</td>
                </tr>
                {/* Marketing */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Marketing</td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center">Consultation</td>
                  <td className="p-4 sm:p-5 text-center">Social Media Promotion</td>
                  <td className="p-4 sm:p-5 text-center">Marketing Campaign</td>
                </tr>
                {/* Distribution */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Distribution</td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center">Book Listing Assistance</td>
                  <td className="p-4 sm:p-5 text-center">Global Distribution</td>
                </tr>
                {/* Dedicated Manager */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Dedicated Manager</td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                </tr>
                {/* Priority Support */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#111827]">Priority Support</td>
                  <td className="p-4 sm:p-5 text-center">Email Support</td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                  <td className="p-4 sm:p-5 text-center">&#8212;</td>
                  <td className="p-4 sm:p-5 text-center"><div className="flex justify-center text-[#F97316] font-bold">&#10004;</div></td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </section>

      {/* ── SECTION 4: WHY CHOOSE MB PUBLISHER ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              {getVal('pricing_why_heading', 'Why Choose MB Publisher?')}
            </h2>
            <p className="text-[#665E58] text-xs font-semibold uppercase tracking-widest block text-center mt-2.5">
              {getVal('pricing_why_sub', 'Quality publication service')}
            </p>
            <p className="text-[13px] text-[#665E58] leading-relaxed text-center mt-3 max-w-xl mx-auto">
              {getVal('pricing_why_desc', 'We ensure complete quality editing, layout design, copyright, printing and bookstore availability.')}
            </p>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* 5 Cards row */}
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

      {/* ── SECTION 5: FAQ ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* Accordion Accordion */}
          <div className="max-w-3xl mx-auto">
            {faqsToRender.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-[#E6E0D5]/60 rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 mb-4"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans font-bold text-[#111827] text-sm sm:text-base hover:bg-neutral-50/50 transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#F97316] transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === index ? 'max-h-[300px] border-t border-[#E6E0D5]/40' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-xs sm:text-sm text-[#665E58] leading-relaxed font-sans bg-[#FAF9F6]/20">
                    {faq.answer}
                  </p>
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

export default Pricing
