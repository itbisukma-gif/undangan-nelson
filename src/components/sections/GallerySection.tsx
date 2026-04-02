"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2 } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { cn } from "@/lib/utils"
import { galleryImages } from "@/lib/wedding-data"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

interface GallerySectionProps {
  isOpen: boolean
  onSelectImage: (url: string) => void
}

export function GallerySection({ isOpen, onSelectImage }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate gallery
  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isOpen])

  return (
    <WeddingSection 
      id="gallery" 
      bgImageId="gallery-bg" 
      isFull 
      bgVariants={bgVariants.zoomIn}
    >
      <motion.div 
        variants={staggerVariants.container} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-10 w-full max-w-5xl px-6"
      >
        <motion.h2 
          id="gallery-heading"
          variants={contentVariants.fadeInUp} 
          className="text-5xl md:text-7xl font-headline italic"
        >
          Galeri
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Main Image */}
          <motion.div 
            variants={contentVariants.fadeInUp}
            className="relative aspect-[4/5] w-full max-w-[300px] md:max-w-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
            onClick={() => onSelectImage(galleryImages[activeIndex].url)}
            role="button"
            tabIndex={0}
            aria-label={`View ${galleryImages[activeIndex].alt || 'gallery image'} in full screen`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectImage(galleryImages[activeIndex].url)
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryImages[activeIndex].id}
                src={galleryImages[activeIndex].url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                alt={galleryImages[activeIndex].alt || "Gallery Hero"}
                loading="lazy"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
            
            <div className="absolute bottom-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Thumbnails */}
          <motion.div 
            variants={contentVariants.fadeInUp} 
            className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar py-4 px-2"
            role="tablist"
            aria-label="Gallery thumbnails"
          >
            {galleryImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(idx)}
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`View photo ${idx + 1}`}
                className={cn(
                  "relative flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 active:scale-90",
                  activeIndex === idx 
                    ? "border-white scale-110 shadow-lg" 
                    : "border-transparent opacity-40 grayscale hover:opacity-60"
                )}
              >
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover" 
                  alt={`Thumbnail ${idx + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </WeddingSection>
  )
}
