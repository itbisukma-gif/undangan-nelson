
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Heart, Users, Calendar, History, ImageIcon, Gift, Send } from "lucide-react"
import { cn } from "@/lib/utils"

// Urutan item navigasi yang disinkronkan dengan urutan seksi di page.tsx
const navItems = [
  { id: "welcome", icon: Heart, label: "Welcome" },
  { id: "couple", icon: Users, label: "Mempelai" },
  { id: "story", icon: History, label: "Kisah" },
  { id: "event", icon: Calendar, label: "Acara" },
  { id: "gallery", icon: ImageIcon, label: "Galeri" },
  { id: "gift", icon: Gift, label: "Hadiah" },
  { id: "rsvp", icon: Send, label: "RSVP" },
]

export function NavigationPill() {
  const [activeTab, setActiveTab] = React.useState("welcome")

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      // Margin diatur agar deteksi terjadi tepat saat seksi berada di tengah layar
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveTab(id)
    }
  }

  return (
    <div className="fixed bottom-10 left-0 right-0 z-[60] flex justify-center px-6 pointer-events-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex items-center gap-1 bg-black/40 backdrop-blur-2xl border border-white/10 p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all outline-none group",
                isActive ? "text-black" : "text-white/40 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
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
