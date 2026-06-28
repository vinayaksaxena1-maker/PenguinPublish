import React from 'react'
import { HeroSection } from './ui/hero-section-2'
import logoImg from '../assets/Logo1.png'
import logoAni from '../assets/LogoAni.mp4'

const Hero: React.FC = () => {
  return (
    <HeroSection
      logo={{
        url: logoImg,
        alt: "MB Publishers Logo",
        text: "MB Publishers"
      }}
      slogan="Digital publication"
      title={
        <>
          We Turn Ideas <br />
          Into Published <span className="text-[#F97316]">Masterpieces.</span>
        </>
      }
      subtitle="Professional book publishing and printing services helping authors bring their stories to life. From initial manuscript editing to global distribution, we guide you every step of the way."
      callToAction={{
        text: "PUBLISH YOUR BOOK",
        href: "/contact",
      }}
      backgroundImage={logoImg}
      backgroundVideo={logoAni}
      contactInfo={{
        website: "mukundabookpublishers@gmail.com",
        phone: "+91 88829 42631",
        address: "New Delhi, India",
      }}
    />
  )
}

export default Hero
