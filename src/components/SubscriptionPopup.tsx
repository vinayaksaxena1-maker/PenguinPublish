import React, { useState, useEffect } from 'react'

const SubscriptionPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if the user has already subscribed or closed the popup in this session
    const hasInteracted = sessionStorage.getItem('mb-popup-interacted')
    
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 35000) // Show popup after 35 seconds delay

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('mb-popup-interacted', 'true')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsVisible(false)
        sessionStorage.setItem('mb-popup-interacted', 'true')
      }, 2500)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 sm:inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
      {/* Dark blurred background overlay - HIDDEN ON MOBILE (prevents search penalty) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 hidden sm:block pointer-events-auto"
        onClick={handleClose}
      />
      
      {/* Glassmorphic Subscription Card - Bottom sheet on mobile, modal on desktop */}
      <div className="relative w-full sm:max-w-md bg-white/95 sm:bg-white/90 backdrop-blur-2xl border-t sm:border border-[#E6E0D5] sm:border-white/60 rounded-t-[24px] sm:rounded-[28px] p-5 sm:p-8 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] sm:shadow-[0_24px_64px_rgba(0,0,0,0.25)] z-10 transition-all duration-500 overflow-hidden transform scale-100 animate-fade-in pointer-events-auto max-h-[38vh] sm:max-h-none overflow-y-auto">
        {/* Ambient spot inside the card */}
        <div className="absolute right-[-80px] top-[-80px] w-48 h-48 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E6E0D5]/60 flex items-center justify-center text-[#665E58] hover:text-[#F97316] hover:border-[#F97316]/40 transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="text-center py-4 sm:py-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-50 border border-[#F97316]/20 text-[#F97316] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#132C1F] mb-2 sm:mb-3">
              Thank You!
            </h3>
            <p className="text-[12px] sm:text-[14px] text-[#665E58] leading-relaxed">
              Successfully subscribed. Check your inbox for the preparation checklist!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Tag/Badge - Hidden on mobile to save vertical space */}
            <span className="premium-badge self-start px-3.5 py-1.5 text-[9px] mb-3 hidden sm:inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
              Exclusive Offer
            </span>

            {/* Heading */}
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#132C1F] leading-tight mb-1.5 sm:mb-3 pr-8">
              Start Your Publishing Journey
            </h3>

            {/* Description */}
            <p className="text-[11px] sm:text-[13px] text-[#665E58] leading-relaxed mb-3 sm:mb-6 pr-4">
              Subscribe to receive our free **Manuscript Checklist** and publishing tips.
            </p>

            {/* Input fields */}
            <div className="flex flex-col sm:flex-col gap-2.5 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex gap-2 sm:flex-col">
                <div className="flex-1">
                  <label className="block text-[8px] sm:text-[10px] font-bold text-[#132C1F] tracking-widest uppercase mb-1 sm:mb-1.5">
                    Name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 sm:h-11 px-3 sm:px-4 text-[12px] sm:text-[13px] bg-white border border-[#E6E0D5] rounded-lg sm:rounded-xl outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-all duration-300"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-[8px] sm:text-[10px] font-bold text-[#132C1F] tracking-widest uppercase mb-1 sm:mb-1.5">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 sm:h-11 px-3 sm:px-4 text-[12px] sm:text-[13px] bg-white border border-[#E6E0D5] rounded-lg sm:rounded-xl outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="btn-premium-orange w-full py-2.5 sm:py-3.5 text-[10px] sm:text-[11px]"
            >
              Get Free Checklist & Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default SubscriptionPopup
