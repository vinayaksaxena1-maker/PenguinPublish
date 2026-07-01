import React from 'react'
import Hero from '../components/Hero'
import MarqueeTicker from '../components/MarqueeTicker'
import FeatureHighlights from '../components/FeatureHighlights'
import PublishingProcess from '../components/PublishingProcess'
import FeaturedBooks from '../components/FeaturedBooks'
import TestimonialsSection from '../components/TestimonialsSection'
import CTABanner from '../components/CTABanner'
import { useCMS } from '../lib/useCMS'
import { useDocumentMetadata } from '../hooks/useDocumentMetadata'

const Home: React.FC = () => {
  const { getVal } = useCMS()

  useDocumentMetadata({
    title: getVal('home_seo_title', 'MB Publisher | Write, Publish & Sell Books Globally'),
    description: getVal('home_seo_desc', 'We help authors edit, format, print, and sell their books globally on Amazon, Flipkart, and major retail bookstores.'),
    ogImage: getVal('home_seo_image', '')
  })

  return (
    <>
      <Hero />
      <MarqueeTicker />
      <FeatureHighlights />
      <PublishingProcess />
      <FeaturedBooks />
      <TestimonialsSection />
      <CTABanner />
    </>
  )
}

export default Home
