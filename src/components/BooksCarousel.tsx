import React, { useState, useEffect } from 'react'
import { booksData } from './BooksData'
import BookCard from './BookCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BooksCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const updateCount = () => {
      const w = window.innerWidth
      if (w >= 1440) {
        setVisibleCount(6)
      } else if (w >= 1024) {
        setVisibleCount(5)
      } else if (w >= 768) {
        setVisibleCount(3)
      } else if (w >= 480) {
        setVisibleCount(2)
      } else {
        setVisibleCount(1)
      }
    }
    
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [])

  // Keep index within bounds if window resized
  const maxIndex = Math.max(0, booksData.length - visibleCount)
  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex)
    }
  }, [visibleCount, activeIndex, maxIndex])

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const totalDots = maxIndex + 1

  return (
    <div className="relative w-full">
      {/* Carousel Wrapper */}
      <div className="relative flex items-center w-full">
        
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous books slide"
          className={`absolute left-0 lg:-left-6 z-30 w-11 h-11 bg-white border border-[#E6E0D5]/50 rounded-full flex items-center justify-center shadow-md text-[#F97316] transition-all duration-300 hover:bg-[#F97316] hover:text-white disabled:opacity-0 disabled:pointer-events-none hover:scale-105`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Outer Clip Area */}
        <div className="w-full overflow-hidden py-4 px-2">
          {/* Inner Sliding Track */}
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` 
            }}
          >
            {booksData.map((book) => (
              <div 
                key={book.id}
                style={{ 
                  flex: `0 0 ${100 / visibleCount}%`,
                  padding: '0 8px' 
                }}
              >
                <BookCard book={book} showButton={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === maxIndex}
          aria-label="Next books slide"
          className={`absolute right-0 lg:-right-6 z-30 w-11 h-11 bg-white border border-[#E6E0D5]/50 rounded-full flex items-center justify-center shadow-md text-[#F97316] transition-all duration-300 hover:bg-[#F97316] hover:text-white disabled:opacity-0 disabled:pointer-events-none hover:scale-105`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* Carousel Indicators */}
      {totalDots > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {[...Array(totalDots)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide page ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-5 bg-[#F97316]' : 'w-2 bg-[#D1D5DB]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BooksCarousel
