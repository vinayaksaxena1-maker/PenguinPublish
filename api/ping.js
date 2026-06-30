import { createClient } from '@supabase/supabase-js'

export default async function handler(request, response) {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://boavalkwiixcpkwvccyk.supabase.co'
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYXZhbGt3aWl4Y3Brd3ZjY3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2Njc2MjYsImV4cCI6MjA5ODI0MzYyNn0.J9UJeIbQPkIguBg6NfuCb5Fbjpi1lqRhxZQ6i2QF-zs'

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    // Query a single record from authors to keep connection active
    const { error } = await supabase.from('authors').select('id').limit(1)
    
    if (error) {
      return response.status(500).json({ success: false, error: error.message })
    }

    return response.status(200).json({ success: true, message: 'Supabase Database pinged successfully!' })
  } catch (err) {
    return response.status(500).json({ success: false, error: err.message })
  }
}
