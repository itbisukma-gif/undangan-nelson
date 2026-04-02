"use client"

import { motion } from "framer-motion"
import { WeddingSection } from "@/components/WeddingSection"
import { 
  coupleName, 
  WEDDING_DATE_FORMATTED, 
  quotes 
} from "@/lib/wedding-data"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

export function WelcomeSection() {
  return (
    <WeddingSection 
      id="welcome" 
      bgImageId="welcome-bg" 
      bgVariants={bgVariants.zoomOut}
    >
      <motion.div 
        variants={staggerVariants.container} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.p 
          variants={contentVariants.fadeInUp} 
          className="text-white/50 uppercase tracking-[0.5em] text-caption mb-6 font-body"
        >
          {quotes.theWeddingOf}
        </motion.p>
        
        <motion.h1 
          id="welcome-heading"
          variants={contentVariants.fadeInUp} 
          className="text-5xl md:text-7xl mb-8 font-headline leading-tight italic text-balance"
        >
          {coupleName}
        </motion.h1>
        
        <motion.div 
          variants={contentVariants.fadeInUp} 
          className="flex flex-col items-center gap-4"
        >
          <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <time 
              dateTime="2026-04-18"
              className="text-lg tracking-[0.4em] font-body text-white/80"
            >
              {WEDDING_DATE_FORMATTED}
            </time>
          </div>
        </motion.div>
      </motion.div>
    </WeddingSection>
  )
}
