
"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

interface WeddingSectionProps {
  id: string
  bgImageId: string
  children: React.ReactNode
  className?: string
}

export function WeddingSection({ id, bgImageId, children, className }: WeddingSectionProps) {
  const bgImage = PlaceHolderImages.find((img) => img.id === bgImageId)

  return (
    <section id={id} className="relative h-screen w-full flex flex-col justify-end overflow-hidden snap-start bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-110"
            priority
            data-ai-hint={bgImage.imageHint}
          />
        )}
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Content Area with Double Fade Effect */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        {/* Top Fade Gradient to prevent hard cuts when scrolling content */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "relative w-full max-h-[70vh] overflow-y-auto no-scrollbar px-8 pt-20 pb-40 bg-gradient-to-t from-black via-black/90 to-transparent",
            className
          )}
        >
          <div className="max-w-md mx-auto space-y-8">
            {children}
          </div>
        </motion.div>

        {/* Bottom Fade Gradient for consistent look */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
      </div>
    </section>
  )
}
