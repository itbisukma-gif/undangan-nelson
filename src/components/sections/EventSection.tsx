"use client"

import { motion } from "framer-motion"
import { Heart, Clock, Calendar, MapPin } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { events } from "@/lib/wedding-data"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

interface EventSectionProps {
  onOpenLocation: () => void
}

export function EventSection({ onOpenLocation }: EventSectionProps) {
  return (
    <WeddingSection 
      id="event" 
      bgImageId="event-bg" 
      bgVariants={bgVariants.slideLeft}
    >
      <motion.div 
        variants={staggerVariants.container} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8 text-center"
      >
        {/* Header */}
        <motion.div variants={contentVariants.fadeInUp} className="mb-4">
          <Heart className="w-6 h-6 mx-auto text-white/30 mb-6" aria-hidden="true" />
          <h2 id="event-heading" className="text-4xl font-headline italic">
            Acara Penting
          </h2>
        </motion.div>

        {/* Event Card */}
        <motion.div variants={contentVariants.fadeInUp}>
          <Card className="bg-glass rounded-[2rem] overflow-hidden border-white/10">
            <CardContent className="p-8 space-y-10">
              {events.map((event, index) => (
                <div key={event.title}>
                  <div className="space-y-4">
                    <h3 className="text-xl font-headline italic text-white/90">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 text-white/60 text-overline font-body">
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        <span className="tracking-widest uppercase">{event.time}</span>
                      </div>
                      
                      {event.date && (
                        <div className="flex items-center justify-center gap-3">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <time className="tracking-widest uppercase">{event.date}</time>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center justify-center gap-3">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span className="tracking-widest uppercase text-balance">
                            {event.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Divider between events */}
                  {index < events.length - 1 && (
                    <div className="h-px bg-white/10 w-1/2 mx-auto mt-10" aria-hidden="true" />
                  )}
                </div>
              ))}

              {/* Location Button */}
              <Button 
                onClick={onOpenLocation}
                className="w-full bg-white text-black hover:bg-white/90 font-bold tracking-[0.2em] h-14 rounded-2xl active:scale-95 transition-all shadow-xl text-xs"
              >
                PETUNJUK LOKASI 
                <MapPin className="ml-2 w-3.5 h-3.5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </WeddingSection>
  )
}
