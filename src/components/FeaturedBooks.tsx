import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import { Book, booksData } from './BooksData'
import { supabase } from '../lib/supabaseClient'
import { useCMS } from '../lib/useCMS'

const FeaturedBooks: React.FC = () => {
  const { getVal } = useCMS()
  const [books, setBooks] = useState<Book[]>(booksData)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('books_catalog')
          .select('*')
          .order('id', { ascending: true })

        if (!error && data && data.length > 0) {
          const mapped = data.map((b: any) => ({
            id: b.id,
            title: b.title,
            author: b.author,
            coverImage: b.cover_image,
            description: b.description || '',
            rating: b.rating || 5,
            slug: b.slug || ''
          }))
          setBooks(mapped)
        }
      } catch (err) {
        console.error("Error fetching dynamic catalog:", err)
      }
    }
    fetchBooks()
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [gapSize, setGapSize] = useState(24)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setWindowWidth(w)
      if (w >= 1280) {
        setVisibleCount(4)
        setGapSize(24)
      } else if (w >= 1024) {
        setVisibleCount(3)
        setGapSize(24)
      } else if (w >= 768) {
        setVisibleCount(2)
        setGapSize(16)
      } else {
        setVisibleCount(1)
        setGapSize(0)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = books.length - visibleCount

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex))
    }
  }, [visibleCount, maxIndex, currentIndex])

  return (
    <section className="py-20 lg:py-28 border-b border-[var(--border-color)] bg-[var(--bg-primary)] relative overflow-hidden">
      
      {/* Background ambient highlights */}
      <div className="absolute left-[-150px] bottom-[-150px] w-[500px] h-[500px] bg-gradient-to-tr from-[rgba(249,115,22,0.08)] to-transparent rounded-full filter blur-[80px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* SECTION TITLE AREA */}
        <div className="flex items-end justify-between border-b border-[var(--border-color)] pb-6 mb-12 max-w-6xl mx-auto">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-[#F97316] uppercase tracking-widest mb-2 block">
              Curated Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-dark)] leading-tight">
              {getVal('home_showcase_heading', 'Featured Books')}
            </h2>
          </div>
          
          <Link 
            to="/books" 
            className="group flex items-center gap-2 font-sans text-xs font-bold text-[#F97316] hover:text-[#ea6c0a] uppercase tracking-wider transition-colors duration-300"
          >
            View All Books
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* BOOK SHOWCASE AREA */}
        <div className="relative w-full px-4 sm:px-12 max-w-6xl mx-auto">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous Books"
            className={`absolute left-[-12px] sm:left-[-4px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center text-[var(--text-dark)] hover:text-[#F97316] hover:border-[#F97316]/50 z-30 transition-all duration-300 ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-[1.04] active:scale-95'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next Books"
            className={`absolute right-[-12px] sm:right-[-4px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center text-[var(--text-dark)] hover:text-[#F97316] hover:border-[#F97316]/50 z-30 transition-all duration-300 ${
              currentIndex === maxIndex ? 'opacity-30 cursor-not-allowed' : 'hover:scale-[1.04] active:scale-95'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Carousel Slider */}
          <div className="overflow-hidden w-full py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={
                windowWidth >= 768
                  ? { 
                      gap: `${gapSize}px`,
                      transform: `translateX(-${currentIndex * (268 + gapSize)}px)` 
                    }
                  : { 
                      transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` 
                    }
              }
            >
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className="shrink-0"
                  style={
                    windowWidth >= 768
                      ? { width: '268px' }
                      : { flex: `0 0 ${100 / visibleCount}%`, padding: '0 8px' }
                  }
                >
                  <BookCard book={book} showButton={true} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default FeaturedBooks
