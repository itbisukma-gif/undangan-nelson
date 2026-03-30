
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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [guestName, setGuestName] = useState("Tamu Undangan")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    // Ambil nama tamu dari URL query parameter ?to=Nama+Tamu
    const params = new URLSearchParams(window.location.search)
    const to = params.get("to")
    if (to) setGuestName(to)
  }, [])

  const galleryImages = [
    { id: 1, url: "https://picsum.photos/seed/gallery1/800/800" },
    { id: 2, url: "https://picsum.photos/seed/gallery2/800/800" },
    { id: 3, url: "https://picsum.photos/seed/gallery3/800/800" },
    { id: 4, url: "https://picsum.photos/seed/gallery4/800/800" },
  ]

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <div className="absolute inset-0 opacity-60">
              <Image 
                src="https://picsum.photos/seed/wedding_cover/1080/1920"
                alt="Cover Background"
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="relative z-10 text-center px-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body tracking-[0.3em] uppercase text-sm mb-4"
              >
                Undangan Pernikahan
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-headline text-6xl md:text-8xl mb-8 italic"
              >
                Cinta & Abadi
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <p className="font-body text-white/70 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <h2 className="text-2xl font-headline italic font-bold">{guestName}</h2>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button 
                  onClick={() => setIsOpen(true)}
                  className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 h-auto text-lg font-bold tracking-widest flex gap-2"
                >
                  BUKA UNDANGAN <MailOpen className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isOpen ? "snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar" : "hidden"}>
        {/* 1. Welcome Section */}
        <WeddingSection id="welcome" bgImageId="welcome-bg">
          <motion.div className="text-center">
            <p className="text-white/70 uppercase tracking-[0.3em] text-sm mb-4 font-body">The Wedding Of</p>
            <h1 className="text-5xl md:text-7xl mb-6 font-headline leading-tight italic">Cinta & Abadi</h1>
            <div className="flex flex-col items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-lg tracking-widest font-body">24 . 12 . 2025</span>
              </div>
            </div>
          </motion.div>
        </WeddingSection>

        {/* 2. Couple Section */}
        <WeddingSection id="couple" bgImageId="couple-bg">
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-headline italic mb-2">Mempelai</h2>
              <p className="text-white/70 text-sm font-body italic">"Maka jadilah mereka satu daging."</p>
            </div>

            <div className="grid gap-12">
              {/* Groom */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 mb-4">
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
                className="flex flex-col items-center text-center"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 mb-4">
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

        {/* 3. Event / Pemberkatan */}
        <WeddingSection id="event" bgImageId="event-bg">
          <div className="space-y-6 text-center">
            <div className="mb-4">
              <Heart className="w-8 h-8 mx-auto text-white/50 mb-4" />
              <h2 className="text-3xl font-headline italic">Acara Penting</h2>
            </div>

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
          </div>
        </WeddingSection>

        {/* 4. Story Timeline */}
        <WeddingSection id="story" bgImageId="story-bg">
          <div className="space-y-8">
            <div className="text-center mb-10">
              <History className="w-8 h-8 mx-auto mb-4 text-white/50" />
              <h2 className="text-3xl font-headline italic">Kisah Kami</h2>
            </div>
            <div className="space-y-12 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/20 pl-6 text-left">
              <motion.div className="relative">
                <div className="absolute -left-[25px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
                <h3 className="text-xl font-headline italic mb-1">Pertemuan Pertama</h3>
                <p className="text-white/70 text-sm leading-relaxed font-body">Berawal dari kedai kopi sederhana di tahun 2020. Sebuah sapaan ringan yang mengubah segalanya.</p>
              </motion.div>
              <motion.div className="relative">
                <div className="absolute -left-[25px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
                <h3 className="text-xl font-headline italic mb-1">Tumbuh Bersama</h3>
                <p className="text-white/70 text-sm leading-relaxed font-body">Melalui berbagai musim, kami belajar bahwa cinta adalah pilihan yang kita buat setiap hari.</p>
              </motion.div>
            </div>
          </div>
        </WeddingSection>

        {/* 5. Photo Gallery */}
        <WeddingSection id="gallery" bgImageId="gallery-bg">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-headline italic mb-2">Galeri Foto</h2>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img) => (
                <motion.div 
                  key={img.id} 
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(img.url)}
                  className="aspect-square relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl"
                >
                  <img 
                    src={img.url} 
                    alt={`Gallery ${img.id}`} 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </WeddingSection>

        {/* 6. Gift Section */}
        <WeddingSection id="gift" bgImageId="gift-bg">
          <div className="text-center space-y-6">
            <Gift className="w-10 h-10 mx-auto text-white/50" />
            <h2 className="text-3xl font-headline italic mb-2">Kado Pernikahan</h2>
            <p className="text-white/70 text-sm font-body">Doa restu Anda adalah karunia terindah. Namun jika ingin memberikan tanda kasih, Anda dapat mengirimkannya melalui:</p>
            
            <div className="grid gap-4">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 flex flex-col items-center">
                  <p className="font-bold text-lg mb-1">Bank Central Asia</p>
                  <p className="text-2xl font-mono tracking-wider mb-2">1234567890</p>
                  <p className="text-white/50 text-sm uppercase">a.n Abadi Prasetya</p>
                  <Button variant="ghost" className="mt-4 text-xs underline underline-offset-4">Salin Rekening</Button>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 flex flex-col items-center">
                  <p className="font-bold text-lg mb-1">Bank Mandiri</p>
                  <p className="text-2xl font-mono tracking-wider mb-2">0987654321</p>
                  <p className="text-white/50 text-sm uppercase">a.n Cinta Lestari</p>
                  <Button variant="ghost" className="mt-4 text-xs underline underline-offset-4">Salin Rekening</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </WeddingSection>

        {/* 7. RSVP Interface */}
        <WeddingSection id="rsvp" bgImageId="rsvp-bg">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-headline italic mb-2">Konfirmasi Kehadiran</h2>
            <p className="text-white/70 text-sm mb-6 font-body">Mohon konfirmasi kehadiran Anda melalui formulir di bawah ini.</p>
            <div className="space-y-4 text-left">
              <Input placeholder="Nama Lengkap" className="bg-white/5 border-white/20 h-12 text-white" />
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-white/5 border-white/20 h-12">Hadir</Button>
                <Button variant="outline" className="flex-1 bg-white/5 border-white/20 h-12">Berhalangan</Button>
              </div>
              <Textarea placeholder="Pesan untuk mempelai..." className="bg-white/5 border-white/20 min-h-[100px]" />
              <Button className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold tracking-widest uppercase rounded-lg">
                KIRIM RSVP <Send className="ml-2 w-4 h-4" />
              </Button>
            </div>
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
        <DialogContent className="max-w-3xl bg-black/90 border-white/10 p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>View Photo</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-square w-full">
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
