"use client"

import { motion } from "framer-motion"
import { History } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { storyTimeline } from "@/lib/wedding-data"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

export function TimelineSection() {
  return (
    <WeddingSection 
      id="story" 
      bgImageId="story-bg" 
      bgVariants={bgVariants.slideUp}
    >
      <motion.div 
        variants={staggerVariants.container} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-16"
      >
        {/* Header */}
        <motion.div variants={contentVariants.fadeInUp} className="text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <History className="w-3.5 h-3.5 inline-block mr-2 text-white/60" aria-hidden="true" />
            <span className="text-caption uppercase tracking-[0.3em] font-body text-white/60">
              Our Journey
            </span>
          </div>
          
          <h2 id="story-heading" className="text-4xl md:text-5xl font-headline italic">
            Kisah Kasih Kami
          </h2>
          
          <div 
            className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" 
            aria-hidden="true" 
          />
        </motion.div>
        
        {/* Timeline */}
        <div className="space-y-16 relative pl-10" role="list">
          {/* Timeline Line */}
          <div 
            className="absolute left-[20px] top-2 bottom-2 w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5 -translate-x-1/2" 
            aria-hidden="true"
          />
          
          {storyTimeline.map((item, index) => (
            <motion.article 
              key={index} 
              variants={contentVariants.fadeInUp} 
              className="relative group"
              role="listitem"
            >
              {/* Timeline Dot */}
              <div 
                className="absolute left-[-20px] top-1.5 -translate-x-1/2 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.8)] relative z-10" />
                <div className="absolute w-6 h-6 rounded-full border border-white/10 group-hover:border-white/40 transition-colors animate-pulse" />
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <span className="text-overline font-bold tracking-[0.4em] text-white/40 uppercase font-body group-hover:text-white/80 transition-colors">
                  {item.year}
                </span>
                
                <h3 className="text-2xl font-headline italic group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed font-body font-light italic max-w-xs">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </WeddingSection>
  )
}
