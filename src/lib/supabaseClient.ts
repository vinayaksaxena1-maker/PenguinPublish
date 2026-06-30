import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://boavalkwiixcpkwvccyk.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYXZhbGt3aWl4Y3Brd3ZjY3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2Njc2MjYsImV4cCI6MjA5ODI0MzYyNn0.J9UJeIbQPkIguBg6NfuCb5Fbjpi1lqRhxZQ6i2QF-zs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
