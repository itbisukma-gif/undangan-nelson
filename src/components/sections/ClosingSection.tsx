"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { coupleName } from "@/lib/wedding-data"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

export function ClosingSection() {
  return (
    <WeddingSection 
      id="closing" 
      bgImageId="closing-bg" 
      isFull 
      bgVariants={bgVariants.softFade}
    >
      <motion.div 
        variants={staggerVariants.containerSlow} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-8 flex flex-col items-center justify-center"
      >
        <motion.div variants={contentVariants.fadeInUp}>
          <Heart className="w-6 h-6 mx-auto text-white/30 mb-8" aria-hidden="true" />
        </motion.div>
        
        <motion.p 
          variants={contentVariants.fadeInUp}
          className="text-white/50 text-sm md:text-base font-body leading-relaxed max-w-md px-4 italic"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i 
          berkenan hadir untuk memberikan doa restu kepada kami.
        </motion.p>
        
        <motion.div variants={contentVariants.fadeInUp} className="pt-8">
          <p className="text-caption font-body uppercase tracking-[0.3em] text-white/40 mb-4">
            Dengan penuh cinta
          </p>
          <h2 className="text-4xl md:text-5xl font-headline italic text-balance">
            {coupleName}
          </h2>
        </motion.div>
        
        <motion.div 
          variants={contentVariants.fadeInUp}
          className="pt-16"
        >
          <div className="h-px w-16 bg-white/20 mx-auto mb-6" aria-hidden="true" />
          <p className="text-caption font-body text-white/30 tracking-widest">
            #NelsonSuni2026
          </p>
        </motion.div>
      </motion.div>
    </WeddingSection>
  )
}
