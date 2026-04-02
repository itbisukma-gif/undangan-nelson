"use client"

import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { Button } from "@/components/ui/button"
import { groom, bride, quotes } from "@/lib/wedding-data"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

interface PersonCardProps {
  person: typeof groom
}

function PersonCard({ person }: PersonCardProps) {
  return (
    <motion.div 
      variants={contentVariants.fadeInUp} 
      className="flex flex-col items-center text-center"
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 border border-white/10 mb-6 group">
        <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
          <img 
            src={person.photo} 
            alt={person.fullName} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        </div>
      </div>
      
      <h3 className="text-2xl font-headline italic mb-2 text-balance">
        {person.fullName}
      </h3>
      
      <p className="text-white/50 text-caption font-body mb-4 tracking-widest uppercase max-w-[200px]">
        {person.parentInfo}
      </p>
      
      <Button 
        asChild 
        variant="outline" 
        size="icon" 
        className="w-8 h-8 rounded-full bg-white/5 border-white/10 hover:bg-white hover:text-black active:scale-90 transition-all"
      >
        <a 
          href={person.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`Instagram ${person.name}`}
        >
          <Instagram className="w-3.5 h-3.5" />
        </a>
      </Button>
    </motion.div>
  )
}

export function CoupleSection() {
  return (
    <WeddingSection 
      id="couple" 
      bgImageId="couple-bg" 
      bgVariants={bgVariants.slideRight}
    >
      <motion.div 
        variants={staggerVariants.container} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-16"
      >
        {/* Header */}
        <div className="text-center">
          <motion.h2 
            id="couple-heading"
            variants={contentVariants.fadeInUp} 
            className="text-4xl font-headline italic mb-4"
          >
            Mempelai
          </motion.h2>
          
          <motion.p 
            variants={contentVariants.fadeInUp} 
            className="text-white/40 text-caption font-body italic tracking-wide max-w-[280px] mx-auto leading-relaxed"
          >
            &ldquo;{quotes.corinthians}&rdquo;
          </motion.p>
        </div>

        {/* Couple Cards */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-8">
          <PersonCard person={groom} />
          <PersonCard person={bride} />
        </div>
      </motion.div>
    </WeddingSection>
  )
}
