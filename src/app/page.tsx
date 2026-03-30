
"use client"

import React from "react"
import { motion } from "framer-motion"
import { WeddingSection } from "@/components/WeddingSection"
import { NavigationPill } from "@/components/NavigationPill"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Heart, History, Users, Send, Music } from "lucide-react"

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar bg-black">
      {/* 1. Welcome Section */}
      <WeddingSection id="welcome" bgImageId="welcome-bg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white/70 uppercase tracking-[0.3em] text-sm mb-4 font-body">The Wedding Of</p>
          <h1 className="text-5xl md:text-7xl mb-6 font-headline leading-tight italic">Cinta & Abadi</h1>
          <div className="flex flex-col items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-lg tracking-widest font-body">24 . 12 . 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm tracking-wide font-body">Grand Ballroom, Jakarta</span>
            </div>
          </div>
        </motion.div>
      </WeddingSection>

      {/* 2. Story Timeline */}
      <WeddingSection id="story" bgImageId="story-bg">
        <div className="space-y-8">
          <div className="text-center mb-10">
            <History className="w-8 h-8 mx-auto mb-4 text-white/50" />
            <h2 className="text-3xl font-headline italic">Our Journey</h2>
          </div>
          
          <div className="space-y-12 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/20 pl-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[25px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
              <h3 className="text-xl font-headline italic mb-1">The First Encounter</h3>
              <p className="text-white/70 text-sm leading-relaxed font-body">It all started in a small coffee shop in 2020. A simple "hello" that changed everything.</p>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -left-[25px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
              <h3 className="text-xl font-headline italic mb-1">Growth & Love</h3>
              <p className="text-white/70 text-sm leading-relaxed font-body">Through seasons and storms, we grew together, learning that love is a choice we make every day.</p>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-[25px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
              <h3 className="text-xl font-headline italic mb-1">The Promise</h3>
              <p className="text-white/70 text-sm leading-relaxed font-body">On a quiet hilltop, we decided to spend the rest of our lives making each other smile.</p>
            </motion.div>
          </div>
        </div>
      </WeddingSection>

      {/* 3. RSVP Interface */}
      <WeddingSection id="rsvp" bgImageId="rsvp-bg">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-headline italic mb-2">Join Our Celebration</h2>
          <p className="text-white/70 text-sm mb-6 font-body">Please let us know if you can attend by December 1st, 2025.</p>
          
          <div className="space-y-4">
            <Input 
              placeholder="Your Full Name" 
              className="bg-white/5 border-white/20 focus:border-white focus:ring-white h-12 text-white placeholder:text-white/40"
            />
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 bg-white/5 border-white/20 hover:bg-white hover:text-black transition-all h-12 rounded-lg">
                Attending
              </Button>
              <Button variant="outline" className="flex-1 bg-white/5 border-white/20 hover:bg-white hover:text-black transition-all h-12 rounded-lg">
                Regretfully Decline
              </Button>
            </div>
            <Textarea 
              placeholder="Message for the couple..." 
              className="bg-white/5 border-white/20 focus:border-white focus:ring-white text-white placeholder:text-white/40 min-h-[100px]"
            />
            <Button className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold tracking-widest uppercase transition-transform active:scale-95 rounded-lg">
              Send RSVP <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </WeddingSection>

      {/* 4. Photo Gallery */}
      <WeddingSection id="gallery" bgImageId="gallery-bg">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-headline italic mb-2">Captured Moments</h2>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square relative rounded-lg overflow-hidden group border border-white/10"
              >
                <img 
                  src={`https://picsum.photos/seed/gallery${i}/400/400`} 
                  alt={`Gallery ${i}`}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" className="text-white hover:text-white/70 hover:bg-transparent font-body underline underline-offset-4">
            View All Photos
          </Button>
        </div>
      </WeddingSection>

      {/* Navigation */}
      <NavigationPill />

      {/* Background Music Helper (Minimalist Visual) */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
        >
          <Music className="w-4 h-4" />
        </motion.button>
      </div>
    </main>
  )
}
