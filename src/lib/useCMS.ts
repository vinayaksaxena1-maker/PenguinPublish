import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function useCMS() {
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  const loadCMS = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .select('key, value')

      if (!error && data) {
        const mapped = data.reduce((acc: Record<string, string>, row: any) => {
          acc[row.key] = row.value
          return acc
        }, {})
        setContent(mapped)
      }
    } catch (err) {
      console.error("Error loading CMS content:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCMS()
  }, [])

  const getVal = (key: string, fallback: string) => {
    const val = content[key]
    return (val !== undefined && val !== null && val !== '') ? val : fallback
  }

  return { getVal, content, loading, reload: loadCMS }
}
