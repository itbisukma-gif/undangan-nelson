"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, MapPin, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { backgroundMusic } from "@/lib/wedding-data"
import { NavigationPill } from "@/components/NavigationPill"
import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Section components
import {
  CoverSection,
  WelcomeSection,
  CoupleSection,
  TimelineSection,
  EventSection,
  GallerySection,
  GiftSection,
  RSVPSection,
  WishesSection,
  ClosingSection,
} from "@/components/sections"

export default function Home() {
  // Core state
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [guestName, setGuestName] = useState("Tamu Undangan")
  
  // Dialog states
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  
  // Audio ref
  const audioRef = useRef<HTMLAudioElement>(null)

  // Handle Invitation Link Parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const to = params.get("to")
      if (to) {
        const decodedName = decodeURIComponent(to.replace(/\+/g, " "))
        setGuestName(decodedName)
      }
    }
  }, [])

  // Audio visibility control - pause when tab hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current || !isOpen) return
      if (document.hidden) {
        audioRef.current.pause()
      } else if (!isMuted) {
        audioRef.current.play().catch(() => {})
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isOpen, isMuted])

  // Sync muted state with audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  // Handle opening the invitation
  const handleOpenInvitation = () => {
    setIsOpen(true)
    audioRef.current?.play().catch(() => {})
  }

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={backgroundMusic.src}
        loop
        preload="auto"
      />

      {/* Cover Page */}
      <AnimatePresence>
        {!isOpen && (
          <CoverSection 
            guestName={guestName} 
            onOpen={handleOpenInvitation} 
          />
        )}
      </AnimatePresence>

      {/* Main Content - Scroll Sections */}
      <div className={cn(
        "snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar scroll-smooth",
        !isOpen && "hidden"
      )}>
        <WelcomeSection />
        <CoupleSection />
        <TimelineSection />
        <EventSection onOpenLocation={() => setIsLocationOpen(true)} />
        <GallerySection isOpen={isOpen} onSelectImage={setSelectedImage} />
        <GiftSection />
        <RSVPSection initialName={guestName} />
        <WishesSection />
        <ClosingSection />

        {/* Audio Toggle Button */}
        <div className="fixed top-6 right-6 z-50">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 active:scale-90 transition-all hover:bg-black/60 shadow-2xl"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <NavigationPill />
      </div>

      {/* Image Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10 p-0 overflow-hidden shadow-2xl rounded-[2.5rem]">
          <DialogHeader className="sr-only">
            <DialogTitle>Momen Kami</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[80vh]">
              <img 
                src={selectedImage} 
                alt="Gallery view" 
                className="w-full h-full object-contain" 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Location Dialog */}
      <LocationDialog 
        isOpen={isLocationOpen} 
        onClose={() => setIsLocationOpen(false)} 
      />
    </main>
  )
}

// ============================================
// Location Dialog Component
// ============================================
interface LocationDialogProps {
  isOpen: boolean
  onClose: () => void
}

function LocationDialog({ isOpen, onClose }: LocationDialogProps) {
  const locations = [
    {
      id: "pemberkatan",
      title: "Pemberkatan",
      address: "Gereja Katolik Garoga, Desa Lontung Jae I, Kec. Garoga, Kabupaten Tapanuli Utara, Sumatera Utara.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.9652234057637!2d99.3574146147547!3d2.031825798518974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302ddb004dbef8ad%3A0xfb05168c67733080!2sGereja%20Katolik%20Garoga!5e0!3m2!1sid!2sid!4v1711280000000!5m2!1sid!2sid",
      mapsLink: "https://www.google.com/maps/place/Gereja+Katolik+Garoga/@2.0318258,99.2837718,13z/data=!4m6!3m5!1s0x302ddb004dbef8ad:0xfb05168c67733080!8m2!3d2.0318258!4d99.3599895!16s%2Fg%2F11vs986vp1!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      id: "resepsi",
      title: "Acara Adat",
      address: "Lumban Pinasa, Desa Gonting Garoga, Kec. Garoga, Kabupaten Tapanuli Utara, Sumatera Utara.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255146.406972034!2d98.8144!3d2.0163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302e132049c69345%3A0xc6c7d7a221f7a08e!2sKabupaten%20Tapanuli%20Utara!5e0!3m2!1sid!2sid!4v1711280000000!5m2!1sid!2sid",
      mapsLink: "https://maps.app.goo.gl/s3kzvppHJAowaABR7",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 border border-white/10 text-white rounded-[2rem] max-w-md w-[95%] mx-auto p-6 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-headline italic text-2xl text-center">
            Petunjuk Lokasi
          </DialogTitle>
        </DialogHeader>
        
        <Accordion type="single" collapsible className="w-full">
          {locations.map((location) => (
            <AccordionItem 
              key={location.id} 
              value={location.id} 
              className="border-white/10"
            >
              <AccordionTrigger className="font-headline italic text-lg hover:no-underline py-4 text-white/90">
                {location.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-6">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-white/40 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-white/60 text-sm leading-relaxed font-body">
                    {location.address}
                  </p>
                </div>
                
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <iframe 
                    src={location.mapEmbed}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map ${location.title}`}
                  />
                </div>

                <Button 
                  asChild
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold tracking-[0.1em] rounded-xl transition-all shadow-lg"
                >
                  <a 
                    href={location.mapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    BUKA GOOGLE MAPS 
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}
