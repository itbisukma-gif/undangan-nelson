
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Heart, BookOpen, ImageIcon, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "welcome", icon: Heart, label: "Welcome" },
  { id: "story", icon: BookOpen, label: "Our Story" },
  { id: "rsvp", icon: CheckCircle, label: "RSVP" },
  { id: "gallery", icon: ImageIcon, label: "Gallery" },
]

export function NavigationPill() {
  const [activeTab, setActiveTab] = React.useState("welcome")

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
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
      // Active tab will be updated by the observer
    }
  }

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/20 p-2 rounded-full shadow-2xl pointer-events-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-full transition-colors",
                isActive ? "text-black" : "text-white/70 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <Icon className="relative z-10 w-5 h-5" />
              <span className="sr-only">{item.label}</span>
            </button>
          )
        })}
      </motion.nav>
    </div>
  )
}
