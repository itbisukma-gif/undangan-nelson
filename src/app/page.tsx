
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
  Music, 
  Instagram, 
  Gift, 
  Clock, 
  Heart,
  MailOpen,
  Maximize2
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [guestName, setGuestName] = useState("Tamu Undangan")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)

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

  // Auto-play for Hero Gallery
  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isOpen, galleryImages.length])

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2, 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }
    })
  }

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          >
            <div className="absolute inset-0 opacity-60">
              <Image 
                src="https://picsum.photos/seed/wedding_cover/1080/1920"
                alt="Cover Background"
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
            <div className="relative z-10 w-full max-w-lg text-center px-6 flex flex-col items-center justify-center">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body tracking-[0.4em] uppercase text-xs md:text-sm mb-6 text-white/80"
              >
                Undangan Pernikahan
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-10"
              >
                <h1 className="font-headline text-6xl md:text-8xl mb-2 italic leading-tight">
                  Cinta & Abadi
                </h1>
                <div className="h-px w-20 bg-white/30 mx-auto" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-14"
              >
                <p className="font-body text-white/60 mb-3 text-sm italic">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <h2 className="text-3xl md:text-4xl font-headline italic font-bold text-white shadow-sm">{guestName}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                className="w-full flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button 
                    onClick={() => setIsOpen(true)}
                    className="bg-white text-black hover:bg-white rounded-full px-10 py-7 h-auto text-sm md:text-base font-bold tracking-[0.2em] flex items-center gap-3 group overflow-hidden relative shadow-2xl"
                  >
                    <span className="relative z-10">BUKA UNDANGAN</span>
                    <motion.div
                      animate={{ 
                        y: [0, -3, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        ease: "easeInOut" 
                      }}
                      className="relative z-10"
                    >
                      <MailOpen className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isOpen ? "snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar" : "hidden"}>
        {/* 1. Welcome Section */}
        <WeddingSection id="welcome" bgImageId="welcome-bg">
          <div className="text-center">
            <motion.p 
              variants={textVariants} initial="hidden" whileInView="visible" custom={1}
              className="text-white/70 uppercase tracking-[0.3em] text-sm mb-4 font-body"
            >
              The Wedding Of
            </motion.p>
            <motion.h1 
              variants={textVariants} initial="hidden" whileInView="visible" custom={2}
              className="text-5xl md:text-7xl mb-6 font-headline leading-tight italic"
            >
              Cinta & Abadi
            </motion.h1>
            <motion.div 
              variants={textVariants} initial="hidden" whileInView="visible" custom={3}
              className="flex flex-col items-center gap-4 text-white/90"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-lg tracking-widest font-body">24 . 12 . 2025</span>
              </div>
            </motion.div>
          </div>
        </WeddingSection>

        {/* 2. Couple Section */}
        <WeddingSection id="couple" bgImageId="couple-bg">
          <div className="space-y-12">
            <div className="text-center">
              <motion.h2 
                variants={textVariants} initial="hidden" whileInView="visible" custom={1}
                className="text-3xl font-headline italic mb-2"
              >
                Mempelai
              </motion.h2>
              <motion.p 
                variants={textVariants} initial="hidden" whileInView="visible" custom={2}
                className="text-white/70 text-sm font-body italic"
              >
                "Maka jadilah mereka satu daging."
              </motion.p>
            </div>

            <div className="grid gap-12">
              {/* Groom */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-xl">
                  <img src="https://picsum.photos/seed/groom/400/400" alt="Groom" className="w-full h-full object-cover grayscale" />
                </div>
                <h3 className="text-2xl font-headline italic mb-1">Abadi Prasetya</h3>
                <p className="text-white/60 text-sm font-body mb-3">Putra dari Bapak Fulan & Ibu Fulanah</p>
                <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/20 hover:bg-white hover:text-black">
                  <Instagram className="w-4 h-4" />
                </Button>
              </motion.div>

              {/* Bride */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-xl">
                  <img src="https://picsum.photos/seed/bride/400/400" alt="Bride" className="w-full h-full object-cover grayscale" />
                </div>
                <h3 className="text-2xl font-headline italic mb-1">Cinta Lestari</h3>
                <p className="text-white/60 text-sm font-body mb-3">Putri dari Bapak Polan & Ibu Polanah</p>
                <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/20 hover:bg-white hover:text-black">
                  <Instagram className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </WeddingSection>

        {/* 3. Event Section */}
        <WeddingSection id="event" bgImageId="event-bg">
          <div className="space-y-6 text-center">
            <motion.div 
              variants={textVariants} initial="hidden" whileInView="visible" custom={1}
              className="mb-4"
            >
              <Heart className="w-8 h-8 mx-auto text-white/50 mb-4" />
              <h2 className="text-3xl font-headline italic">Acara Penting</h2>
            </motion.div>

            <motion.div
              variants={textVariants} initial="hidden" whileInView="visible" custom={2}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-headline italic text-white mb-2 underline decoration-white/30 underline-offset-8">Pemberkatan</h3>
                    <div className="space-y-2 text-white/80">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>09.00 - 11.00 WIB</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Minggu, 24 Desember 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 w-full" />

                  <div>
                    <h3 className="text-xl font-headline italic text-white mb-2 underline decoration-white/30 underline-offset-8">Resepsi</h3>
                    <div className="space-y-2 text-white/80">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>12.00 - Selesai</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Grand Ballroom, Jakarta</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-white/80 font-bold tracking-widest">
                    LIHAT LOKASI <MapPin className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </WeddingSection>

        {/* 4. Story Timeline */}
        <WeddingSection id="story" bgImageId="story-bg">
          <div className="space-y-8">
            <motion.div 
              variants={textVariants} initial="hidden" whileInView="visible" custom={1}
              className="text-center mb-10"
            >
              <History className="w-8 h-8 mx-auto mb-4 text-white/50" />
              <h2 className="text-3xl font-headline italic">Kisah Kami</h2>
            </motion.div>
            <div className="space-y-12 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/20 pl-6 text-left">
              <motion.div 
                variants={textVariants} initial="hidden" whileInView="visible" custom={2}
                className="relative"
              >
                <div className="absolute -left-[25px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
                <h3 className="text-xl font-headline italic mb-1">Pertemuan Pertama</h3>
                <p className="text-white/70 text-sm leading-relaxed font-body">Berawal dari kedai kopi sederhana di tahun 2020. Sebuah sapaan ringan yang mengubah segalanya.</p>
              </motion.div>
              <motion.div 
                variants={textVariants} initial="hidden" whileInView="visible" custom={3}
                className="relative"
              >
                <div className="absolute -left-[25px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
                <h3 className="text-xl font-headline italic mb-1">Tumbuh Bersama</h3>
                <p className="text-white/70 text-sm leading-relaxed font-body">Melalui berbagai musim, kami belajar bahwa cinta adalah pilihan yang kita buat setiap hari.</p>
              </motion.div>
            </div>
          </div>
        </WeddingSection>

        {/* 5. Photo Gallery - Optimized Layout */}
        <WeddingSection id="gallery" bgImageId="gallery-bg" isFull>
          <div className="text-center space-y-6 w-full max-w-5xl px-4">
            <motion.h2 
              variants={textVariants} initial="hidden" whileInView="visible" custom={1}
              className="text-4xl md:text-5xl font-headline italic mb-4"
            >
              Galeri Foto
            </motion.h2>
            
            <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-center">
              {/* Hero Image Slider - Adjust width/height for better balance */}
              <motion.div 
                variants={textVariants} initial="hidden" whileInView="visible" custom={2}
                className="relative aspect-[4/5] w-full max-w-[320px] md:max-w-[400px] lg:max-w-[450px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group cursor-pointer"
                onClick={() => setSelectedImage(galleryImages[activeGalleryIndex].url)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryImages[activeGalleryIndex].id}
                    src={galleryImages[activeGalleryIndex].url}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt="Hero Gallery"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-xl rounded-full p-4 md:p-6 scale-75 group-hover:scale-100 transition-transform duration-700">
                    <Maximize2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-[10px] md:text-xs tracking-[0.3em] font-bold text-white/90 border border-white/10">
                  {activeGalleryIndex + 1} / {galleryImages.length}
                </div>
              </motion.div>

              {/* Selector / Thumbnails - Vertical on Desktop, Horizontal on Mobile */}
              <motion.div 
                variants={textVariants} initial="hidden" whileInView="visible" custom={3}
                className="flex lg:flex-col justify-center gap-3 md:gap-4 w-full lg:w-auto px-4 py-2 overflow-x-auto lg:overflow-y-auto no-scrollbar scroll-smooth"
              >
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={cn(
                      "relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500",
                      activeGalleryIndex === idx 
                        ? "border-white scale-105 md:scale-110 shadow-2xl z-10" 
                        : "border-transparent opacity-40 hover:opacity-100"
                    )}
                  >
                    <img 
                      src={img.url} 
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        activeGalleryIndex === idx ? "grayscale-0" : "grayscale"
                      )} 
                      alt={`Thumbnail ${idx}`} 
                    />
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </WeddingSection>

        {/* 6. Gift Section */}
        <WeddingSection id="gift" bgImageId="gift-bg">
          <div className="text-center space-y-6">
            <motion.div variants={textVariants} initial="hidden" whileInView="visible" custom={1}>
              <Gift className="w-10 h-10 mx-auto text-white/50" />
              <h2 className="text-3xl font-headline italic mb-2 mt-4">Kado Pernikahan</h2>
              <p className="text-white/70 text-sm font-body">Doa restu Anda adalah karunia terindah. Namun jika ingin memberikan tanda kasih, Anda dapat mengirimkannya melalui:</p>
            </motion.div>
            
            <div className="grid gap-4">
              <motion.div variants={textVariants} initial="hidden" whileInView="visible" custom={2}>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 flex flex-col items-center">
                    <p className="font-bold text-lg mb-1">Bank Central Asia</p>
                    <p className="text-2xl font-mono tracking-wider mb-2">1234567890</p>
                    <p className="text-white/50 text-sm uppercase">a.n Abadi Prasetya</p>
                    <Button variant="ghost" className="mt-4 text-xs underline underline-offset-4">Salin Rekening</Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={textVariants} initial="hidden" whileInView="visible" custom={3}>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 flex flex-col items-center">
                    <p className="font-bold text-lg mb-1">Bank Mandiri</p>
                    <p className="text-2xl font-mono tracking-wider mb-2">0987654321</p>
                    <p className="text-white/50 text-sm uppercase">a.n Cinta Lestari</p>
                    <Button variant="ghost" className="mt-4 text-xs underline underline-offset-4">Salin Rekening</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </WeddingSection>

        {/* 7. RSVP Interface */}
        <WeddingSection id="rsvp" bgImageId="rsvp-bg">
          <div className="text-center space-y-6">
            <motion.div variants={textVariants} initial="hidden" whileInView="visible" custom={1}>
              <h2 className="text-3xl font-headline italic mb-2">Konfirmasi Kehadiran</h2>
              <p className="text-white/70 text-sm mb-6 font-body">Mohon konfirmasi kehadiran Anda melalui formulir di bawah ini.</p>
            </motion.div>
            <motion.div 
              variants={textVariants} initial="hidden" whileInView="visible" custom={2}
              className="space-y-4 text-left"
            >
              <Input placeholder="Nama Lengkap" className="bg-white/5 border-white/20 h-12 text-white" />
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-white/5 border-white/20 h-12">Hadir</Button>
                <Button variant="outline" className="flex-1 bg-white/5 border-white/20 h-12">Berhalangan</Button>
              </div>
              <Textarea placeholder="Pesan untuk mempelai..." className="bg-white/5 border-white/20 min-h-[100px]" />
              <Button className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold tracking-widest uppercase rounded-lg">
                KIRIM RSVP <Send className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </WeddingSection>

        {/* Navigation */}
        <NavigationPill />

        {/* Background Music */}
        <div className="fixed top-6 right-6 z-50">
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <Music className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10 p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>View Photo</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full h-[80vh]">
              <img 
                src={selectedImage} 
                alt="Enlarged gallery photo" 
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
