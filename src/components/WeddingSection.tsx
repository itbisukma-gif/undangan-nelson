
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
  isFull?: boolean
}

export function WeddingSection({ id, bgImageId, children, className, isFull = false }: WeddingSectionProps) {
  const bgImage = PlaceHolderImages.find((img) => img.id === bgImageId)

  return (
    <section id={id} className="relative h-screen w-full flex flex-col justify-end overflow-hidden snap-start bg-black">
      {/* Background Layer with Parallax Effect Hint */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover transition-transform duration-[2000ms] hover:scale-105 brightness-[0.4]"
            priority
            data-ai-hint={bgImage.imageHint}
          />
        )}
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Area with Double Fade Effect */}
      <div className={cn(
        "relative z-10 w-full flex flex-col",
        isFull ? "h-full justify-center" : "h-full justify-end"
      )}>
        {/* Top Fade Gradient for Smoothness */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className={cn(
            "relative w-full no-scrollbar px-10 pt-24 pb-48",
            isFull ? "h-full flex flex-col justify-center items-center pb-32" : "max-h-[75vh] overflow-y-auto",
            className
          )}
        >
          <div className={cn("mx-auto", isFull ? "w-full max-w-5xl" : "max-w-md")}>
            {children}
          </div>
        </motion.div>

        {/* Bottom Fade Gradient to anchor the NavigationPill visually */}
        {!isFull && <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-20" />}
      </div>
    </section>
  )
}
