import React from 'react'
import { HeroSection } from './ui/hero-section-2'
import logoImg from '../assets/Logo1.png'
import logoAni from '../assets/LogoAni.mp4'
import { useCMS } from '../lib/useCMS'

const Hero: React.FC = () => {
  const { getVal } = useCMS()

  return (
    <HeroSection
      logo={{
        url: logoImg,
        alt: "MB Publishers Logo",
        text: "MB Publishers"
      }}
      slogan="Digital publication"
      title={getVal('home_hero_heading', 'Write, Publish & Sell Globally')}
      subtitle={getVal('home_hero_text', 'We help authors transform manuscripts into beautifully printed books and distribute them across leading platforms like Amazon and Flipkart.')}
      callToAction={{
        text: getVal('home_hero_button', 'GET STARTED NOW'),
        href: "/contact",
      }}
      backgroundImage={logoImg}
      backgroundVideo={getVal('home_hero_video', logoAni)}
      contactInfo={{
        website: getVal('home_contact_email', 'info@mbpublishers.com'),
        phone: getVal('home_contact_phone', '+91 88829 42631'),
        address: getVal('home_contact_city', 'New Delhi, India'),
      }}
    />
  )
}

export default Hero
