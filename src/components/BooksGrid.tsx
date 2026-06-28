import React from 'react'
import { booksData } from './BooksData'
import BookCard from './BookCard'

const BooksGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {booksData.map((book) => (
        <BookCard key={book.id} book={book} showButton={true} />
      ))}
    </div>
  )
}

export default BooksGrid
