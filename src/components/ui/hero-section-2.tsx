import React from 'react';
import { cn } from "../../lib/utils";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        phone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};


// Prop types for the HeroSection component
interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  backgroundVideo?: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, backgroundVideo, contactInfo, ...props }, ref) => {
    
    // Dynamic screen width detection for responsive clip-path
    const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
    const [videoEnded, setVideoEnded] = React.useState(false);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (video.currentTime >= 10.0) {
        video.pause();
        video.currentTime = 10.0;
        setVideoEnded(true);
      }
    };

    React.useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };
    
    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col-reverse lg:flex-row overflow-hidden bg-[var(--bg-primary)] text-[var(--text-dark)] min-h-[500px] lg:h-[calc(100vh-104px)]",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Left Side: Content with Slide-in animation */}
        <motion.div 
          className="flex w-full flex-col justify-center gap-5 p-6 sm:p-8 md:p-8 lg:p-8 lg:py-6 lg:px-10 z-10 bg-[var(--bg-primary)] overflow-hidden"
          style={isDesktop ? { padding: videoEnded ? undefined : 0 } : undefined}
          initial={isDesktop ? { width: '0%', x: '-100%', opacity: 0, filter: 'blur(8px)' } : { width: '100%', x: 0, opacity: 1, filter: 'blur(0px)' }}
          animate={isDesktop ? { 
            width: videoEnded ? '55%' : '0%', 
            x: videoEnded ? '0%' : '-100%', 
            opacity: videoEnded ? 1 : 0,
            filter: videoEnded ? 'blur(0px)' : 'blur(8px)'
          } : { 
            width: '100%', 
            x: 0, 
            opacity: 1,
            filter: 'blur(0px)'
          }}
          transition={{ 
            default: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 3.0, ease: "easeInOut" },
            opacity: { duration: 2.5, ease: "easeInOut" }
          }}
        >
            {/* Top Section: Logo & Main Content */}
            <div>

                <motion.main variants={containerVariants}>
                    <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] font-bold leading-tight text-[var(--text-dark)] font-serif max-w-xl" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    <motion.div className="my-2 h-1 w-20 bg-[#F97316]" variants={itemVariants}></motion.div>
                    <motion.p className="mb-3 md:mb-4 max-w-md text-[13px] md:text-sm text-[var(--text-muted)] leading-relaxed" variants={itemVariants}>
                        {subtitle}
                    </motion.p>
                    <Link to={callToAction.href}>
                      <motion.button className="btn-premium-orange px-6 py-3 md:px-8 md:py-3.5 text-xs font-bold tracking-wider rounded-xl shadow-lg" variants={itemVariants}>
                          {callToAction.text}
                      </motion.button>
                    </Link>
                </motion.main>
            </div>

            {/* Bottom Section: Footer Info */}
            <motion.footer className="mt-3 md:mt-4 w-full pt-3 border-t border-[var(--border-color)]" variants={itemVariants}>
                <div className="grid grid-cols-1 gap-3 text-xs text-[var(--text-muted)] sm:grid-cols-[2fr_1fr_1fr] font-semibold">
                    <div className="flex items-start min-w-0">
                        <InfoIcon type="website" />
                        <span className="text-[10px] leading-snug" style={{ wordBreak: 'break-all' }}>
                          {contactInfo.website}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="phone" />
                        <span className="whitespace-nowrap">{contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="address" />
                        <span>{contactInfo.address}</span>
                    </div>
                </div>
            </motion.footer>
        </motion.div>

        {/* Right Side: Image/Video that shrinks and moves to the right after video ends */}
        <motion.div 
          className="w-full min-h-[300px] sm:min-h-[400px] lg:min-h-full relative z-0 overflow-hidden bg-white"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={isDesktop ? { width: '100%' } : { width: '100%' }}
          animate={isDesktop ? { 
            width: videoEnded ? '45%' : '100%'
          } : { 
            width: '100%' 
          }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {backgroundVideo && (
            <video
              src={backgroundVideo}
              autoPlay
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Cover Spine Shadow simulation */}
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent z-10" />
          {/* Shining glint effect after video freezes */}
          {videoEnded && (
            <div className="video-shine absolute inset-0 z-10 pointer-events-none" />
          )}
        </motion.div>

        {/* Glowing Divider Line (Explicit orange transparent color to prevent black interpolation) */}
        {videoEnded && isDesktop && (
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2.5, delay: 1.0, ease: "easeInOut" }}
            className="absolute left-[55%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F97316]/0 via-[#F97316]/90 to-[#F97316]/0 z-20 origin-top -translate-x-1/2"
          />
        )}
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
