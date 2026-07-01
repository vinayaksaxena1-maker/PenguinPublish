import { useEffect } from 'react'

interface MetadataProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
}

export function useDocumentMetadata({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website'
}: MetadataProps) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title
    }

    // Helper to update or create meta tag
    const setMetaTag = (name: string, value: string, isProperty = false) => {
      if (!value) return
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let tag = document.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        if (isProperty) {
          tag.setAttribute('property', name)
        } else {
          tag.setAttribute('name', name)
        }
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', value)
    }

    // 2. Description
    if (description) {
      setMetaTag('description', description)
    }

    // 3. Canonical Link
    const currentUrl = canonicalUrl || window.location.href
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', currentUrl)

    // 4. Open Graph tags
    if (title) setMetaTag('og:title', title, true)
    if (description) setMetaTag('og:description', description, true)
    setMetaTag('og:url', currentUrl, true)
    setMetaTag('og:type', ogType, true)
    if (ogImage) {
      setMetaTag('og:image', ogImage, true)
    }

    // 5. Twitter card tags
    setMetaTag('twitter:card', 'summary_large_image')
    if (title) setMetaTag('twitter:title', title)
    if (description) setMetaTag('twitter:description', description)
    if (ogImage) {
      setMetaTag('twitter:image', ogImage)
    }

    // 6. GA4 SPA Route Change Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        page_path: window.location.pathname
      })
    }
  }, [title, description, canonicalUrl, ogImage, ogType])
}
