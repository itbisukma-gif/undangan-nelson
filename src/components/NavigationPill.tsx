"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  Users, 
  Calendar, 
  History, 
  ImageIcon, 
  Gift, 
  Send, 
  MessageSquare,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { easing } from "@/lib/animations"

// Navigation items synchronized with page sections
const navItems = [
  { id: "welcome", icon: Heart, label: "Beranda" },
  { id: "couple", icon: Users, label: "Mempelai" },
  { id: "story", icon: History, label: "Kisah" },
  { id: "event", icon: Calendar, label: "Acara" },
  { id: "gallery", icon: ImageIcon, label: "Galeri" },
  { id: "gift", icon: Gift, label: "Hadiah" },
  { id: "rsvp", icon: Send, label: "RSVP" },
  { id: "wishes", icon: MessageSquare, label: "Ucapan" },
  { id: "closing", icon: Sparkles, label: "Penutup" },
] as const

export function NavigationPill() {
  const [activeTab, setActiveTab] = useState("welcome")
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  // Intersection observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.2,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveTab(id)
    }
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % navItems.length
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + navItems.length) % navItems.length
    } else if (e.key === "Home") {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === "End") {
      e.preventDefault()
      nextIndex = navItems.length - 1
    }

    if (nextIndex !== currentIndex) {
      const button = document.querySelector(`[data-nav-index="${nextIndex}"]`) as HTMLButtonElement
      button?.focus()
    }
  }, [])

  return (
    <div className="fixed bottom-8 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easing.smooth }}
        className="flex items-center gap-0.5 sm:gap-1 bg-black/50 backdrop-blur-2xl border border-white/10 p-1 sm:p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden"
        role="tablist"
        aria-label="Navigasi halaman"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          const isHovered = hoveredTab === item.id

          return (
            <div key={item.id} className="relative">
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[10px] font-medium rounded-md whitespace-nowrap shadow-lg pointer-events-none hidden sm:block"
                  >
                    {item.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                data-nav-index={index}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onFocus={() => setHoveredTab(item.id)}
                onBlur={() => setHoveredTab(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                role="tab"
                aria-selected={isActive}
                aria-label={item.label}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 group",
                  isActive ? "text-black" : "text-white/40 hover:text-white/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon 
                  className={cn(
                    "relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] transition-transform duration-200",
                    isActive && "scale-110",
                    "group-active:scale-90"
                  )} 
                />
              </button>
            </div>
          )
        })}
      </motion.nav>
    </div>
  )
}
