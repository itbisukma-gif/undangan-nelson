
"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WeddingSection } from "@/components/WeddingSection"
import { NavigationPill } from "@/components/NavigationPill"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
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
import { 
  Calendar, 
  MapPin, 
  History, 
  Send, 
  Instagram, 
  Gift, 
  Clock, 
  Heart,
  MailOpen,
  Maximize2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [guestName, setGuestName] = useState("Tamu Undangan")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  const audioRef = useRef<HTMLAudioElement>(null)

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date("2025-12-24T09:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get("to")
    if (to) setGuestName(to)
  }, [])

  const galleryImages = [
    { id: 1, url: "https://picsum.photos/seed/gallery1/800/1200" },
    { id: 2, url: "https://picsum.photos/seed/gallery2/1200/800" },
    { id: 3, url: "https://picsum.photos/seed/gallery3/800/1200" },
    { id: 4, url: "https://picsum.photos/seed/gallery4/1200/800" },
  ]

  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isOpen, galleryImages.length])

  // Audio Control Logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current?.pause()
      } else if (isOpen && !isMuted) {
        audioRef.current?.play().catch(() => {})
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isOpen, isMuted])

  const handleOpenInvitation = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay prevented by browser:", error)
      })
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''))
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
    }
  }

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/backgroud_song/Holong Panimpuli.webm"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          >
            <div className="relative z-10 w-full max-w-lg text-center px-8 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, letterSpacing: "1em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ duration: 1.5 }}
                className="font-body uppercase text-[10px] md:text-xs mb-8 text-white/60"
              >
                Undangan Pernikahan
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-8"
              >
                <h1 className="font-headline text-5xl md:text-7xl mb-4 italic leading-tight">
                  Nelson & Suni
                </h1>
                <div className="h-px w-12 bg-white/20 mx-auto" />
              </motion.div>

              {/* Countdown Timer with Vertical Separators */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex items-center gap-4 md:gap-8 mb-12"
              >
                <div className="text-center min-w-[60px]">
                  <span className="block text-2xl md:text-4xl font-headline italic mb-1">{timeLeft.days}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 font-body">Hari</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center min-w-[60px]">
                  <span className="block text-2xl md:text-4xl font-headline italic mb-1">{timeLeft.hours}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 font-body">Jam</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center min-w-[60px]">
                  <span className="block text-2xl md:text-4xl font-headline italic mb-1">{timeLeft.minutes}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 font-body">Menit</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center min-w-[60px]">
                  <span className="block text-2xl md:text-4xl font-headline italic mb-1">{timeLeft.seconds}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 font-body">Detik</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mb-12"
              >
                <p className="font-body text-white/40 mb-3 text-[10px] italic tracking-widest uppercase">Eksklusif Untuk</p>
                <h2 className="text-2xl md:text-4xl font-headline italic text-white/90">{guestName}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <Button 
                  onClick={handleOpenInvitation}
                  className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-8 h-auto text-xs md:text-sm font-bold tracking-[0.3em] flex items-center gap-4 shadow-2xl transition-all active:scale-95 group"
                >
                  BUKA UNDANGAN
                  <MailOpen className="w-4 h-4 group-hover:animate-float transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn(
        "snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar scroll-smooth",
        !isOpen && "hidden"
      )}>
        {/* 1. Welcome Section */}
        <WeddingSection id="welcome" bgImageId="welcome-bg">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible"
            className="text-center"
          >
            <motion.p variants={fadeInUp} className="text-white/50 uppercase tracking-[0.5em] text-[10px] mb-6 font-body">
              The Wedding Of
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl mb-8 font-headline leading-tight italic">
              Nelson & Suni
            </motion.h1>
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
              <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="text-lg tracking-[0.4em] font-body text-white/80">24 . 12 . 2025</span>
              </div>
            </motion.div>
          </motion.div>
        </WeddingSection>

        {/* 2. Couple Section */}
        <WeddingSection id="couple" bgImageId="couple-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-16">
            <div className="text-center">
              <motion.h2 variants={fadeInUp} className="text-4xl font-headline italic mb-4">Mempelai</motion.h2>
              <motion.p variants={fadeInUp} className="text-white/40 text-[10px] font-body italic tracking-wide max-w-[250px] mx-auto leading-relaxed">
                "Maka jadilah mereka satu daging, karena kasih adalah pengikat yang sempurna."
              </motion.p>
            </div>

            <div className="grid gap-16 md:grid-cols-2 md:gap-8">
              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 border border-white/10 mb-6 group">
                  <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/groom/600/600" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />
                </div>
                <h3 className="text-2xl font-headline italic mb-2 text-balance">Nelson Mandela Sianturi</h3>
                <p className="text-white/50 text-[10px] font-body mb-4 tracking-widest uppercase">Putra dari Bpk. Fulan & Ibu Fulanah</p>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-white/5 border-white/10 hover:bg-white hover:text-black active:scale-90 transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 border border-white/10 mb-6 group">
                  <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/bride/600/600" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse delay-75" />
                </div>
                <h3 className="text-2xl font-headline italic mb-2">Suni Manik</h3>
                <p className="text-white/50 text-[10px] font-body mb-4 tracking-widest uppercase">Putri dari Bpk. Polan & Ibu Polanah</p>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-white/5 border-white/10 hover:bg-white hover:text-black active:scale-90 transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </WeddingSection>

        {/* 3. Story Timeline */}
        <WeddingSection id="story" bgImageId="story-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-12">
            <motion.div variants={fadeInUp} className="text-center mb-4">
              <History className="w-6 h-6 mx-auto mb-6 text-white/30" />
              <h2 className="text-4xl font-headline italic">Kisah Kami</h2>
            </motion.div>
            
            <div className="space-y-16 relative before:absolute before:left-0 before:top-4 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-white/40 before:to-transparent pl-8">
              <motion.div variants={fadeInUp} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2 block font-body">2020</span>
                <h3 className="text-xl font-headline italic mb-2">Pertemuan Pertama</h3>
                <p className="text-white/60 text-xs leading-relaxed font-body">Di sebuah sudut kota Jakarta, takdir mempertemukan kami lewat secangkir kopi dan percakapan sederhana yang tak berujung.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-white/40 border border-white/20" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2 block font-body">2023</span>
                <h3 className="text-xl font-headline italic mb-2">Tumbuh Bersama</h3>
                <p className="text-white/60 text-xs leading-relaxed font-body">Melalui tawa dan air mata, kami menyadari bahwa rumah bukanlah sebuah tempat, melainkan satu sama lain.</p>
              </motion.div>
            </div>
          </motion.div>
        </WeddingSection>

        {/* 4. Event Section */}
        <WeddingSection id="event" bgImageId="event-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-8 text-center">
            <motion.div variants={fadeInUp} className="mb-4">
              <Heart className="w-6 h-6 mx-auto text-white/30 mb-6" />
              <h2 className="text-4xl font-headline italic">Acara Penting</h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-glass rounded-[2rem] overflow-hidden border-white/10">
                <CardContent className="p-8 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-headline italic text-white/90">Pemberkatan</h3>
                    <div className="space-y-3 text-white/60 text-[11px] font-body">
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="tracking-widest uppercase">09.00 - 11.00 WIB</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="tracking-widest uppercase">Minggu, 24 Desember 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 w-1/2 mx-auto" />

                  <div className="space-y-4">
                    <h3 className="text-xl font-headline italic text-white/90">Resepsi</h3>
                    <div className="space-y-3 text-white/60 text-[11px] font-body">
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="tracking-widest uppercase">12.00 - Selesai</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="tracking-widest uppercase">Grand Ballroom, Jakarta</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setIsLocationOpen(true)}
                    className="w-full bg-white text-black hover:bg-white/90 font-bold tracking-[0.2em] h-14 rounded-2xl active:scale-95 transition-all shadow-xl text-xs"
                  >
                    PETUNJUK LOKASI <MapPin className="ml-2 w-3.5 h-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </WeddingSection>

        {/* 5. Photo Gallery */}
        <WeddingSection id="gallery" bgImageId="gallery-bg" isFull>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="text-center space-y-10 w-full max-w-5xl px-6">
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-headline italic">
              Galeri
            </motion.h2>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
              <motion.div 
                variants={fadeInUp}
                className="relative aspect-[4/5] w-full max-w-[300px] md:max-w-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
                onClick={() => setSelectedImage(galleryImages[activeGalleryIndex].url)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryImages[activeGalleryIndex].id}
                    src={galleryImages[activeGalleryIndex].url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                    alt="Gallery Hero"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar py-4 px-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={cn(
                      "relative flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 active:scale-90",
                      activeGalleryIndex === idx 
                        ? "border-white scale-110 shadow-lg" 
                        : "border-transparent opacity-40 grayscale"
                    )}
                  >
                    <img src={img.url} className="w-full h-full object-cover" alt="Thumb" />
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </WeddingSection>

        {/* 6. Gift Section */}
        <WeddingSection id="gift" bgImageId="gift-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="text-center space-y-10">
            <motion.div variants={fadeInUp}>
              <Gift className="w-8 h-8 mx-auto text-white/30" />
              <h2 className="text-4xl font-headline italic mt-6 mb-4">Hadiah Cinta</h2>
              <p className="text-white/50 text-[10px] font-body tracking-wide leading-relaxed px-4">Kehadiran Anda adalah kado terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, silakan melalui saluran berikut:</p>
            </motion.div>
            
            <div className="grid gap-6">
              <motion.div variants={fadeInUp}>
                <div className="p-8 rounded-[2rem] bg-glass border-white/10">
                  <p className="font-bold text-[9px] tracking-[0.3em] uppercase mb-4 opacity-70 font-body">Bank Central Asia</p>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-xl md:text-3xl font-mono tracking-tighter">123 456 7890</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-10 h-10 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-90"
                      onClick={() => handleCopy("123 456 7890", "bca")}
                    >
                      {copiedId === "bca" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest font-body">a.n Nelson Mandela Sianturi</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <div className="p-8 rounded-[2rem] bg-glass border-white/10">
                  <p className="font-bold text-[9px] tracking-[0.3em] uppercase mb-4 opacity-70 font-body">Bank Mandiri</p>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-xl md:text-3xl font-mono tracking-tighter">098 765 4321</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-10 h-10 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-90"
                      onClick={() => handleCopy("098 765 4321", "mandiri")}
                    >
                      {copiedId === "mandiri" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest font-body">a.n Suni Manik</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </WeddingSection>

        {/* 7. RSVP Section */}
        <WeddingSection id="rsvp" bgImageId="rsvp-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="text-center space-y-10">
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-headline italic mb-4">Reservasi</h2>
              <p className="text-white/50 text-[10px] font-body mb-6 tracking-wide px-4">Mohon konfirmasi kehadiran Anda untuk menyempurnakan hari bahagia kami.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-6 text-left bg-glass p-8 rounded-[2rem] border-white/10">
              <Input placeholder="Nama Lengkap" className="bg-transparent border-white/10 h-14 rounded-xl text-white focus:ring-1 focus:ring-white/40 font-body text-xs" />
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-white/5 border-white/10 h-14 rounded-xl active:bg-white active:text-black transition-all font-body text-xs">Hadir</Button>
                <Button variant="outline" className="flex-1 bg-white/5 border-white/10 h-14 rounded-xl active:bg-white active:text-black transition-all font-body text-xs">Absen</Button>
              </div>
              <Textarea placeholder="Pesan & Harapan..." className="bg-transparent border-white/10 min-h-[120px] rounded-xl focus:ring-1 focus:ring-white/40 font-body text-xs" />
              <Button className="w-full h-16 bg-white text-black hover:bg-white/90 font-bold tracking-[0.3em] rounded-2xl active:scale-95 transition-all shadow-xl text-xs">
                KIRIM KONFIRMASI <Send className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </WeddingSection>

        {/* Floating Music Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 active:scale-90 transition-all hover:bg-black/60 shadow-2xl"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <NavigationPill />
      </div>

      {/* Gallery Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10 p-0 overflow-hidden shadow-2xl rounded-[2.5rem]">
          <DialogHeader className="sr-only">
            <DialogTitle>Momen Kami</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[80vh]">
              <img src={selectedImage} alt="Gallery view" className="w-full h-full object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Location Modal */}
      <Dialog open={isLocationOpen} onOpenChange={setIsLocationOpen}>
        <DialogContent className="bg-black/95 border border-white/10 text-white rounded-[2rem] max-w-md w-[95%] mx-auto p-6 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-headline italic text-2xl text-center">Petunjuk Lokasi</DialogTitle>
          </DialogHeader>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pemberkatan" className="border-white/10">
              <AccordionTrigger className="font-headline italic text-lg hover:no-underline py-4 text-white/90">
                Pemberkatan
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-6">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <p className="text-white/60 text-sm leading-relaxed font-body">
                    Gereja Katedral Jakarta, Jl. Katedral No.7, Ps. Baru, Sawah Besar, Jakarta Pusat.
                  </p>
                </div>
                
                {/* Map Preview */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6974128509826!2d106.8305!3d-6.169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5cfea21e05d%3A0x272b1448b1d9607b!2sGereja%20Katedral%20Jakarta!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map Pemberkatan"
                  />
                </div>

                <Button 
                  asChild
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold tracking-[0.1em] rounded-xl transition-all shadow-lg"
                >
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    BUKA GOOGLE MAPS <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="resepsi" className="border-white/10">
              <AccordionTrigger className="font-headline italic text-lg hover:no-underline py-4 text-white/90">
                Resepsi
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-6">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <p className="text-white/60 text-sm leading-relaxed font-body">
                    Grand Ballroom, Hotel Indonesia Kempinski, Jl. M.H. Thamrin No.1, Jakarta Pusat.
                  </p>
                </div>

                {/* Map Preview */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521255857245!2d106.8214!3d-6.1947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f417688229b1%3A0xc6214f48b0a178e2!2sHotel%20Indonesia%20Kempinski%20Jakarta!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map Resepsi"
                  />
                </div>

                <Button 
                  asChild
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold tracking-[0.1em] rounded-xl transition-all shadow-lg"
                >
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    BUKA GOOGLE MAPS <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>
    </main>
  )
}
