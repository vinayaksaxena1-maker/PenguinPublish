import React from 'react'
import Hero from '../components/Hero'
import MarqueeTicker from '../components/MarqueeTicker'
import FeatureHighlights from '../components/FeatureHighlights'
import PublishingProcess from '../components/PublishingProcess'
import FeaturedBooks from '../components/FeaturedBooks'
import TestimonialsSection from '../components/TestimonialsSection'
import CTABanner from '../components/CTABanner'

const Home: React.FC = () => {
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
