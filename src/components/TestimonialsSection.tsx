import React from 'react'
import { Quote } from 'lucide-react'

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "MB Publisher made my dream come true. Their professionalism, quality, and support are unmatched!",
      author: "Ritika Sharma",
      role: "Author of 'Whispers of Destiny'",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: 2,
      quote: "From editing to printing, everything was handled perfectly. Highly recommended for every author!",
      author: "Arjun Mehta",
      role: "Author of 'Echoes of Eternity'",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: 3,
      quote: "The print quality is exceptional and their team is very cooperative throughout the process.",
      author: "Meera Patel",
      role: "Author of 'The Golden Horizon'",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ]

  return (
    <section className="py-20 md:py-28 border-b border-[var(--border-color)] relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Background ambient glow */}
      <div className="absolute right-[-150px] bottom-[-150px] w-[500px] h-[500px] bg-gradient-to-tr from-[rgba(21,62,42,0.15)] to-transparent rounded-full filter blur-[80px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* SECTION TITLE */}
        <div className="flex flex-col items-center mb-16 text-center max-w-2xl mx-auto">
          <span className="premium-badge mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
            Author Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-dark)] leading-tight mt-1">
            What Authors Say About Us
          </h2>
          <div className="w-[45px] h-[3px] bg-[#F97316] rounded-full mt-4" />
        </div>

        {/* TESTIMONIAL LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 hover:-translate-y-2 hover:border-[#F97316]/50 transition-all duration-500 flex flex-col justify-between h-full group shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_48px_rgba(249,115,22,0.1)]"
            >
              {/* Top part: Quote Icon and Testimonial Text */}
              <div>
                <Quote className="w-8 h-8 text-[#F97316] opacity-35 group-hover:opacity-70 transition-opacity mb-5" />
                
                {/* Testimonial Text */}
                <p className="text-sm text-[var(--text-dark)] leading-relaxed font-sans italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Bottom part: Author Area */}
              <div className="flex items-center gap-4 pt-5 border-t border-[var(--border-color)] mt-auto">
                <img 
                  src={item.image} 
                  alt={item.author} 
                  className="w-12 h-12 rounded-full object-cover shadow-md border border-[var(--border-color)] select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
                  draggable="false"
                />
                
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-bold text-[var(--text-dark)] leading-none group-hover:text-[#F97316] transition-colors duration-300">
                    {item.author}
                  </span>
                  <span className="text-[11px] font-medium text-[var(--text-muted)] mt-1.5 leading-none">
                    {item.role}
                  </span>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mt-2.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F97316] text-[12px] leading-none">&#9733;</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection
