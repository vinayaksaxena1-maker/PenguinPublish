import React, { useEffect, useState } from 'react'
import { booksData, Book } from './BooksData'
import BookCard from './BookCard'
import { supabase } from '../lib/supabaseClient'

const BooksGrid: React.FC = () => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} showButton={true} />
      ))}
    </div>
  )
}

export default BooksGrid
