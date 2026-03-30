
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
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover transition-transform duration-[2000ms] hover:scale-105 brightness-[0.7] blur-[3px] scale-110"
            priority
            data-ai-hint={bgImage.imageHint}
          />
        )}
      </div>

      {/* Content Area */}
      <div className={cn(
        "relative z-10 w-full flex flex-col",
        isFull ? "h-full justify-center" : "h-full justify-end"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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

        {/* Bottom Fade Gradient for navigation readability */}
        {!isFull && <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-20" />}
      </div>
    </section>
  )
}
