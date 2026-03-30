
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
    <section id={id} className="relative h-screen w-full flex flex-col justify-end overflow-hidden snap-start">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
            data-ai-hint={bgImage.imageHint}
          />
        )}
        {/* Dim and Blur Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content Area - Half Bottom */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "relative z-10 w-full max-h-[60vh] overflow-y-auto no-scrollbar p-8 pb-32 bg-gradient-to-t from-black via-black/80 to-transparent",
          className
        )}
      >
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </motion.div>
    </section>
  )
}
