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
    title: getVal('home_seo_title', 'Book Publishing Services in India | Self-Publishing Platform - MB Publisher'),
    description: getVal('home_seo_desc', 'MB Publisher is one of the leading self-publishing companies in India. Publish your book online with professional manuscript editing and global distribution on Amazon and Flipkart.'),
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
