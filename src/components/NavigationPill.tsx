
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Heart, Users, Calendar, History, ImageIcon, Gift, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "welcome", icon: Heart, label: "Welcome" },
  { id: "couple", icon: Users, label: "Mempelai" },
  { id: "event", icon: Calendar, label: "Acara" },
  { id: "story", icon: History, label: "Kisah" },
  { id: "gallery", icon: ImageIcon, label: "Galeri" },
  { id: "gift", icon: Gift, label: "Hadiah" },
  { id: "rsvp", icon: Send, label: "RSVP" },
]

export function NavigationPill() {
  const [activeTab, setActiveTab] = React.useState("welcome")

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed bottom-10 left-0 right-0 z-[60] flex justify-center px-6 pointer-events-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex items-center gap-1.5 bg-black/40 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full transition-all outline-none group",
                isActive ? "text-black" : "text-white/40 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn(
                "relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform group-active:scale-90",
                isActive && "scale-110"
              )} />
              <span className="sr-only">{item.label}</span>
            </button>
          )
        })}
      </motion.nav>
    </div>
  )
}
