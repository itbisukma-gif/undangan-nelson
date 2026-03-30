"use client"

import React, { useState, useEffect } from "react"
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
  Check
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
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image 
                src="https://picsum.photos/seed/wedding_cover/1080/1920"
                alt="Cover Background"
                fill
                className="object-cover grayscale brightness-50"
                priority
              />
            </div>
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
                className="mb-12"
              >
                <h1 className="font-headline text-5xl md:text-8xl mb-4 italic leading-tight">
                  Cinta & Abadi
                </h1>
                <div className="h-px w-12 bg-white/20 mx-auto" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mb-16"
              >
                <p className="font-body text-white/40 mb-3 text-xs italic tracking-widest uppercase">Eksklusif Untuk</p>
                <h2 className="text-3xl md:text-5xl font-headline italic text-white/90">{guestName}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Button 
                  onClick={() => setIsOpen(true)}
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
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl mb-8 font-headline leading-tight italic">
              Cinta & Abadi
            </motion.h1>
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
              <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="text-lg md:text-xl tracking-[0.4em] font-body text-white/80">24 . 12 . 2025</span>
              </div>
            </motion.div>
          </motion.div>
        </WeddingSection>

        {/* 2. Couple Section */}
        <WeddingSection id="couple" bgImageId="couple-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-16">
            <div className="text-center">
              <motion.h2 variants={fadeInUp} className="text-4xl font-headline italic mb-4">Mempelai</motion.h2>
              <motion.p variants={fadeInUp} className="text-white/40 text-xs font-body italic tracking-wide max-w-[250px] mx-auto">
                "Maka jadilah mereka satu daging, karena kasih adalah pengikat yang sempurna."
              </motion.p>
            </div>

            <div className="grid gap-16 md:grid-cols-2 md:gap-8">
              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1.5 border border-white/10 mb-6 group">
                  <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/groom/600/600" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />
                </div>
                <h3 className="text-3xl font-headline italic mb-2">Abadi Prasetya</h3>
                <p className="text-white/50 text-[10px] font-body mb-4 tracking-widest uppercase">Putra dari Bpk. Fulan & Ibu Fulanah</p>
                <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-white hover:text-black active:scale-95 transition-all">
                  <Instagram className="w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1.5 border border-white/10 mb-6 group">
                  <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/bride/600/600" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse delay-75" />
                </div>
                <h3 className="text-3xl font-headline italic mb-2">Cinta Lestari</h3>
                <p className="text-white/50 text-[10px] font-body mb-4 tracking-widest uppercase">Putri dari Bpk. Polan & Ibu Polanah</p>
                <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-white hover:text-black active:scale-95 transition-all">
                  <Instagram className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </WeddingSection>

        {/* 3. Event Section */}
        <WeddingSection id="event" bgImageId="event-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-8 text-center">
            <motion.div variants={fadeInUp} className="mb-4">
              <Heart className="w-8 h-8 mx-auto text-white/30 mb-6" />
              <h2 className="text-4xl font-headline italic">Acara Penting</h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-glass rounded-[2rem] overflow-hidden">
                <CardContent className="p-10 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-headline italic text-white/90">Pemberkatan</h3>
                    <div className="space-y-3 text-white/60 text-sm">
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-4 h-4" />
                        <span className="tracking-wide">09.00 - 11.00 WIB</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Calendar className="w-4 h-4" />
                        <span className="tracking-wide">Minggu, 24 Desember 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 w-1/2 mx-auto" />

                  <div className="space-y-4">
                    <h3 className="text-2xl font-headline italic text-white/90">Resepsi</h3>
                    <div className="space-y-3 text-white/60 text-sm">
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-4 h-4" />
                        <span className="tracking-wide">12.00 - Selesai</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <MapPin className="w-4 h-4" />
                        <span className="tracking-wide">Grand Ballroom, Jakarta</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-white/90 font-bold tracking-[0.2em] h-14 rounded-2xl active:scale-95 transition-all shadow-xl">
                    PETUNJUK LOKASI <MapPin className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </WeddingSection>

        {/* 4. Story Timeline */}
        <WeddingSection id="story" bgImageId="story-bg">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-12">
            <motion.div variants={fadeInUp} className="text-center mb-4">
              <History className="w-8 h-8 mx-auto mb-6 text-white/30" />
              <h2 className="text-4xl font-headline italic">Kisah Kami</h2>
            </motion.div>
            
            <div className="space-y-16 relative before:absolute before:left-0 before:top-4 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-white/40 before:to-transparent pl-8">
              <motion.div variants={fadeInUp} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2 block font-body">2020</span>
                <h3 className="text-2xl font-headline italic mb-2">Pertemuan Pertama</h3>
                <p className="text-white/60 text-sm leading-relaxed font-body">Di sebuah sudut kota Jakarta, takdir mempertemukan kami lewat secangkir kopi dan percakapan sederhana yang tak berujung.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-white/40 border border-white/20" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2 block font-body">2023</span>
                <h3 className="text-2xl font-headline italic mb-2">Tumbuh Bersama</h3>
                <p className="text-white/60 text-sm leading-relaxed font-body">Melalui tawa dan air mata, kami menyadari bahwa rumah bukanlah sebuah tempat, melainkan satu sama lain.</p>
              </motion.div>
            </div>
          </motion.div>
        </WeddingSection>

        {/* 5. Photo Gallery - Full Page optimized */}
        <WeddingSection id="gallery" bgImageId="gallery-bg" isFull>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="text-center space-y-10 w-full max-w-5xl px-6">
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-headline italic">
              Galeri
            </motion.h2>
            
            <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
              <motion.div 
                variants={fadeInUp}
                className="relative aspect-[4/5] w-full max-w-[340px] md:max-w-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
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
                <div className="absolute bottom-6 right-6 p-4 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex lg:flex-col gap-4 overflow-x-auto no-scrollbar py-4 px-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={cn(
                      "relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 active:scale-95",
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
              <Gift className="w-10 h-10 mx-auto text-white/30" />
              <h2 className="text-4xl font-headline italic mt-6 mb-4">Hadiah Cinta</h2>
              <p className="text-white/50 text-xs font-body tracking-wide leading-relaxed">Kehadiran Anda adalah kado terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, silakan melalui saluran berikut:</p>
            </motion.div>
            
            <div className="grid gap-6">
              <motion.div variants={fadeInUp}>
                <div className="p-8 rounded-[2rem] bg-glass">
                  <p className="font-bold text-[10px] tracking-[0.3em] uppercase mb-4 opacity-70 font-body">Bank Central Asia</p>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-2xl md:text-3xl font-mono tracking-tighter">123 456 7890</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-90"
                      onClick={() => handleCopy("123 456 7890", "bca")}
                    >
                      {copiedId === "bca" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-body">a.n Abadi Prasetya</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <div className="p-8 rounded-[2rem] bg-glass">
                  <p className="font-bold text-[10px] tracking-[0.3em] uppercase mb-4 opacity-70 font-body">Bank Mandiri</p>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-2xl md:text-3xl font-mono tracking-tighter">098 765 4321</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-90"
                      onClick={() => handleCopy("098 765 4321", "mandiri")}
                    >
                      {copiedId === "mandiri" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-body">a.n Cinta Lestari</p>
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
              <p className="text-white/50 text-xs font-body mb-6 tracking-wide">Mohon konfirmasi kehadiran Anda untuk menyempurnakan hari bahagia kami.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-6 text-left bg-glass p-8 rounded-[2rem]">
              <Input placeholder="Nama Lengkap" className="bg-transparent border-white/10 h-14 rounded-xl text-white focus:ring-1 focus:ring-white/40 font-body" />
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-white/5 border-white/10 h-14 rounded-xl active:bg-white active:text-black transition-all font-body">Hadir</Button>
                <Button variant="outline" className="flex-1 bg-white/5 border-white/10 h-14 rounded-xl active:bg-white active:text-black transition-all font-body">Absen</Button>
              </div>
              <Textarea placeholder="Pesan & Harapan..." className="bg-transparent border-white/10 min-h-[120px] rounded-xl focus:ring-1 focus:ring-white/40 font-body" />
              <Button className="w-full h-16 bg-white text-black hover:bg-white/90 font-bold tracking-[0.3em] rounded-2xl active:scale-95 transition-all shadow-xl">
                KIRIM KONFIRMASI <Send className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </WeddingSection>

        {/* Floating Music Toggle */}
        <div className="fixed top-8 right-8 z-50">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 active:scale-90 transition-all hover:bg-black/60 shadow-2xl"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        <NavigationPill />
      </div>

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
    </main>
  )
}
