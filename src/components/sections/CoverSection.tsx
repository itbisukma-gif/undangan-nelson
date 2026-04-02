"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MailOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { 
  coupleName, 
  quotes, 
  WEDDING_DATE 
} from "@/lib/wedding-data"
import { useCountdown, formatCountdownUnit } from "@/hooks/useCountdown"
import { easing, transitions } from "@/lib/animations"

interface CoverSectionProps {
  guestName: string
  onOpen: () => void
}

const countdownUnits = [
  { key: "days", label: "Hari" },
  { key: "hours", label: "Jam" },
  { key: "minutes", label: "Menit" },
  { key: "seconds", label: "Detik" },
] as const

export function CoverSection({ guestName, onOpen }: CoverSectionProps) {
  const coverBg = PlaceHolderImages?.find(img => img.id === "cover-bg")
  const timeLeft = useCountdown(WEDDING_DATE)

  return (
    <motion.div
      key="cover"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 1.2, ease: easing.dramatic }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        {coverBg && (
          <Image
            src={coverBg.imageUrl}
            alt={coverBg.description}
            fill
            className="object-cover brightness-[0.25] blur-[1px]"
            priority
            sizes="100vw"
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg text-center px-6 sm:px-8 flex flex-col items-center justify-center">
        {/* Invitation Label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5 }}
          className="font-body uppercase text-caption mb-8 text-white/60"
        >
          {quotes.invitation}
        </motion.p>
        
        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...transitions.slow }}
          className="mb-8"
        >
          <h1 className="font-headline text-5xl md:text-7xl mb-4 italic leading-tight text-balance">
            {coupleName}
          </h1>
          <div className="h-px w-12 bg-white/20 mx-auto" aria-hidden="true" />
        </motion.div>

        {/* Countdown Timer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...transitions.slow }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-12"
          aria-label="Hitung mundur ke hari pernikahan"
        >
          {countdownUnits.map((unit, index) => (
            <div key={unit.key} className="flex items-center gap-4 sm:gap-6">
              <div className="text-center min-w-[50px]">
                <span className="block text-2xl md:text-4xl font-headline italic mb-1">
                  {formatCountdownUnit(timeLeft[unit.key])}
                </span>
                <span className="text-caption uppercase tracking-widest opacity-40 font-body">
                  {unit.label}
                </span>
              </div>
              {index < countdownUnits.length - 1 && (
                <div className="h-10 w-px bg-white/10" aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Guest Name */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, ...transitions.slow }}
          className="mb-12"
        >
          <p className="font-body text-white/40 mb-3 text-caption italic tracking-widest uppercase">
            {quotes.exclusiveFor}
          </p>
          <h2 className="text-2xl md:text-4xl font-headline italic text-white/90 text-balance">
            {guestName}
          </h2>
        </motion.div>

        {/* Open Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, ...transitions.smooth }}
        >
          <Button 
            onClick={onOpen}
            className="bg-white text-black hover:bg-white/90 rounded-full px-10 sm:px-12 py-7 sm:py-8 h-auto text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.3em] flex items-center gap-3 sm:gap-4 shadow-2xl transition-all active:scale-95 group"
          >
            {quotes.openInvitation}
            <MailOpen className="w-4 h-4 group-hover:animate-float transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
