import React from 'react'
import { Book } from './BooksData'
import { ArrowRight } from 'lucide-react'

interface BookCardProps {
  book: Book;
  showButton?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, showButton = false }) => {
  return (
    <div className="flex flex-col justify-between h-full bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316]/50 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_48px_rgba(249,115,22,0.1)] group">
      <div>
        {/* Book Cover Area */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.3)] mb-6 bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          {/* Background Cover Image */}
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Cover Spine Shadow simulation */}
          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/35 to-transparent z-20" />
          <div className="absolute top-0 bottom-0 left-[2px] w-[1px] bg-white/10 z-20" />
        </div>

        {/* Book Metadata */}
        <div className="flex flex-col items-start px-1">
          {/* Title */}
          <h4 className="font-serif font-bold text-lg text-[var(--text-dark)] line-clamp-2 leading-snug mb-1.5 group-hover:text-[#F97316] transition-colors duration-300">
            {book.title}
          </h4>
          
          {/* Author */}
          <span className="text-xs text-[var(--text-muted)] mb-3 font-semibold font-sans uppercase tracking-wider">
            By {book.author}
          </span>
          
          {/* Ratings */}
          <div className="flex items-center gap-0.5 mb-4">
            {[...Array(book.rating)].map((_, i) => (
              <span key={i} className="text-[#F97316] text-[13px] leading-none">&#9733;</span>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3 mb-6 font-sans min-h-[54px]">
            {book.description}
          </p>
        </div>
      </div>

      {/* Optional Details Button */}
      {showButton && (
        <a
          href={`/contact?book=${encodeURIComponent(book.title)}`}
          className="btn-premium-orange w-full h-[44px] group/btn"
        >
          Order Now
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </a>
      )}
    </div>
  )
}

export default BookCard
