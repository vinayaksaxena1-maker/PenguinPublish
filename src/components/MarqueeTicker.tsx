import React from 'react'
import { useCMS } from '../lib/useCMS'

const MarqueeTicker: React.FC = () => {
  const { getVal } = useCMS()
  const rawText = getVal('home_marquee_text', 'ISBN Assistance • 100% Author Owned Rights • Global Bookstore Distribution • Premium Printing Excellence • Professional Proofreading & Editing • 1500+ Authors Served')
  const items = rawText.split('•').map(s => s.trim()).filter(Boolean)

  // Duplicate items array to make a continuous seamless loop
  const displayItems = [...items, ...items, ...items]

  return (
    <div className="marquee-container w-full relative z-30">
      <div className="marquee-content select-none">
        {displayItems.map((text, index) => (
          <div key={index} className="marquee-item">
            <span>{text}</span>
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarqueeTicker
