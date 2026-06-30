import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Zap, 
  User, 
  BookOpen, 
  Headphones, 
  ArrowRight, 
  ChevronDown 
} from 'lucide-react'

import cont1 from "../assets/Cont1.png"
import cont2 from "../assets/Cont2.png"
import CTABanner from "../components/CTABanner"

// Custom SVG component for BadgeDollarSign to ensure compatibility
const BadgeDollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 6v12" />
  </svg>
)

const Contact: React.FC = () => {
  const [formSent, setFormSent] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
  }

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "How long does publishing take?",
      answer: "Publishing timelines vary depending on editing, design, and printing requirements."
    },
    {
      question: "Do you provide ISBN support?",
      answer: "Yes, complete ISBN and copyright guidance is included."
    },
    {
      question: "Can you print small quantities?",
      answer: "Yes, both short-run and large-volume printing are available."
    },
    {
      question: "Do you provide global distribution?",
      answer: "Yes, we help authors reach readers worldwide."
    }
  ]

  return (
    <div className="w-full bg-brand-cream text-[#2C2520] overflow-hidden">
      
      {/* ── SECTION 1: CONTACT HERO ── */}
      <section className="relative w-full bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-start">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-semibold text-[#F97316] uppercase tracking-widest">
                  CONTACT MB PUBLISHER
                </span>
                <div className="w-8 h-[1.5px] bg-[#F97316]" />
              </div>
              
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[52px] font-serif text-[#132C1F] leading-[1.12] mb-6 font-bold tracking-tight">
                Let's Bring Your<br />
                <span className="text-[#F97316]">Book To Life.</span>
              </h1>
              
              {/* Description */}
              <p className="text-[#665E58] font-sans text-[13px] sm:text-sm mb-8 leading-relaxed max-w-xl">
                Whether you're ready to publish, need a quote, or have questions about our publishing services, our team is here to help.
              </p>
              
              {/* Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-sans font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg text-[10px] tracking-wider uppercase"
                >
                  Request A Quote <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="tel:+918882942631"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#F97316] text-[#F97316] font-sans font-semibold rounded-xl hover:bg-[#F97316] hover:text-white hover:scale-[1.02] transition-all duration-300 text-[10px] tracking-wider uppercase"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Us Now
                </a>
              </div>
            </div>
            
            {/* Right Image */}
            <div>
              <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-[#E6E0D5]/50">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Premium publishing consultation workspace"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── SECTION 2: GET IN TOUCH ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Get In Touch
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* 4 Premium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* Card 1: Phone & WhatsApp */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-[16px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#F97316] flex items-center justify-center text-[#F97316] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-sm text-[#111827] mb-2">Contact Us</h3>
              <p className="text-xs text-[#665E58] font-medium leading-relaxed">
                Call: <a href="tel:+918882942631" className="hover:text-[#F97316] transition-colors">+91 88829 42631</a>
              </p>
              <p className="text-xs text-[#665E58] font-medium leading-relaxed mt-1">
                WhatsApp: <a href="https://wa.me/919958271481" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">+91 99582 71481</a>
              </p>
            </div>
            
            {/* Card 2: Email */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-[16px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#F97316] flex items-center justify-center text-[#F97316] mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-sm text-[#111827] mb-2">Email Us</h3>
              <a href="mailto:mukundabookpublishers@gmail.com" className="text-xs text-[#665E58] font-medium leading-relaxed hover:text-[#F97316] transition-colors">
                mukundabookpublishers@gmail.com
              </a>
            </div>
            
            {/* Card 3: Address */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-[16px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#F97316] flex items-center justify-center text-[#F97316] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-sm text-[#111827] mb-2">Office Address</h3>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                D-16 pandav nagar<br />
                near ramleela c- park<br />
                New Delhi, India
              </p>
            </div>
            
            {/* Card 4: Hours */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-[16px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#F97316] flex items-center justify-center text-[#F97316] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-sm text-[#111827] mb-2">Working Hours</h3>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                Monday - Saturday<br />
                9:00 AM - 7:00 PM
              </p>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ── SECTION 3: CONTACT FORM ── */}
      <section id="contact-form" className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Form */}
            <div className="flex flex-col justify-center">
              {/* Heading */}
              <div className="flex flex-col items-start mb-8">
                <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#111827] leading-tight">
                  Send Us A Message
                </h2>
                <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-2" />
              </div>
              
              {formSent ? (
                <div className="bg-orange-50 border border-[#F97316]/30 text-[#132C1F] p-8 rounded-2xl text-center shadow-sm">
                  <h3 className="font-serif text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-sm text-[#665E58]">
                    Your inquiry has been successfully submitted. Our publishing consultant will get in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      className="w-full h-[56px] px-4 border border-[#E6E0D5] bg-white rounded-[10px] text-sm text-[#2C2520] focus:border-[#F97316] focus:outline-none transition-colors"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      className="w-full h-[56px] px-4 border border-[#E6E0D5] bg-white rounded-[10px] text-sm text-[#2C2520] focus:border-[#F97316] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required 
                      className="w-full h-[56px] px-4 border border-[#E6E0D5] bg-white rounded-[10px] text-sm text-[#2C2520] focus:border-[#F97316] focus:outline-none transition-colors"
                    />
                    <div className="relative w-full">
                      <select 
                        required 
                        defaultValue=""
                        className="w-full h-[56px] px-4 pr-10 border border-[#E6E0D5] bg-white rounded-[10px] text-sm text-[#2C2520] focus:border-[#F97316] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="" disabled>Book Genre</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="self-help">Self-Help</option>
                        <option value="poetry">Poetry</option>
                        <option value="biography">Biography</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#665E58]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Row 3 */}
                  <div>
                    <textarea 
                      placeholder="Message" 
                      required 
                      className="w-full h-[180px] p-4 border border-[#E6E0D5] bg-white rounded-[10px] text-sm text-[#2C2520] focus:border-[#F97316] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-sans font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg text-xs tracking-wider uppercase"
                  >
                    Submit Inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
            
            {/* Right Column: Image */}
            <div className="flex items-center">
              <div className="relative w-full h-[280px] sm:h-[380px] lg:h-full min-h-[350px] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-[#E6E0D5]/50">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                  alt="MB Publisher consultation meeting"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY CONTACT MB PUBLISHER ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Why Contact MB Publisher?
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* 5 columns features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Fast Response
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                We respond within 24 hours.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <User className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Expert Guidance
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                Professional publishing consultation.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Complete Publishing
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                End-to-end publishing support.
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <BadgeDollarSignIcon className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Transparent Pricing
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                No hidden charges.
              </p>
            </div>
            
            {/* Card 5 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col items-center text-center h-full group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-105">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold text-[14px] text-[#111827] mb-2">
                Dedicated Support
              </h4>
              <p className="text-[11px] text-[#665E58] leading-relaxed">
                Personal assistance throughout publishing.
              </p>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ── SECTION 5: FAQ SECTION ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* Accordion List */}
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
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

      {/* ── SECTION 6: VISIT OUR OFFICE ── */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Visit Our Office
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* Map & Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Google Map iframe */}
            <div className="lg:col-span-7 h-[420px] rounded-[20px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-[#E6E0D5]/50">
              <iframe
                title="Google Maps Location: Pandav Nagar, New Delhi"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://maps.google.com/maps?q=Pandav%20Nagar,%20near%20Ramleela%20C-Park,%20New%20Delhi,%20Delhi,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>
            
            {/* Office Info Card */}
            <div className="lg:col-span-3 bg-white border border-[#E6E0D5]/50 rounded-[20px] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-center gap-6">
              
              {/* Card Title */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest">
                  Our Office
                </span>
                <div className="w-8 h-[1.5px] bg-[#F97316]" />
              </div>
              
              {/* Info Row 1 */}
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-1" />
                <p className="text-xs sm:text-sm text-[#665E58] leading-relaxed">
                  D-16 Pandav Nagar<br />
                  near Ramleela C-Park<br />
                  New Delhi - 110092
                </p>
              </div>
              
              {/* Info Row 2 */}
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                <a href="tel:+918882942631" className="text-xs sm:text-sm text-[#665E58] hover:text-[#F97316] transition-colors">
                  +91 88829 42631
                </a>
              </div>
              
              {/* Info Row 3 */}
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                <a href="mailto:mukundabookpublishers@gmail.com" className="text-xs sm:text-sm text-[#665E58] hover:text-[#F97316] transition-colors truncate">
                  mukundabookpublishers@gmail.com
                </a>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>

      {/* ── SECTION 7: TRUSTED BY THOUSANDS OF AUTHORS ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6E0D5]">
        <div className="site-container">
          
          {/* Centered Heading */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-[#111827] text-center leading-tight">
              Trusted By Thousands Of Authors
            </h2>
            <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-3" />
          </div>
          
          {/* 3 Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Card 1 */}
            <div className="bg-white border border-[#E6E0D5]/60 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div>
                {/* Quote Icon */}
                <svg className="w-6 h-6 text-[#F97316] mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {/* Testimonial Text */}
                <p className="text-[12px] sm:text-[13px] font-medium text-[#374151] leading-[1.6] font-sans italic mb-6">
                  "MB publishers made my dream come true. Their professionalism, quality, and support are unmatched."
                </p>
              </div>

              {/* Author Area */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#F3F4F6]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Ritika Sharma"
                  className="w-12 h-12 rounded-full object-cover border border-[#E6E0D5]/50 shadow-sm flex-shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-bold text-[#111827] leading-none">
                    Ritika Sharma
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

            {/* Card 2 */}
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

            {/* Card 3 */}
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
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Meera Iyer"
                  className="w-12 h-12 rounded-full object-cover border border-[#E6E0D5]/50 shadow-sm flex-shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-bold text-[#111827] leading-none">
                    Meera Iyer
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

export default Contact
