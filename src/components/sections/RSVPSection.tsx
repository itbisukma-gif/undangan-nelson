"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { quotes } from "@/lib/wedding-data"
import { useWishes } from "@/hooks/useWishes"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

interface RSVPSectionProps {
  initialName: string
}

export function RSVPSection({ initialName }: RSVPSectionProps) {
  const [name, setName] = useState(initialName)
  const [status, setStatus] = useState<"Hadir" | "Absen" | null>(null)
  const [message, setMessage] = useState("")
  const { toast } = useToast()
  const { sendWish, isSending } = useWishes()

  const handleSubmit = async () => {
    if (!name || !status || !message) {
      toast({
        variant: "destructive",
        title: "Data belum lengkap",
        description: "Mohon lengkapi nama, status kehadiran, dan ucapan Anda.",
      })
      return
    }

    const result = await sendWish({ name, status, message })
    
    if (result.success) {
      toast({
        title: "Berhasil!",
        description: `Terima kasih ${name}, konfirmasi dan ucapan Anda telah kami terima.`,
      })
      setMessage("")
      setStatus(null)
    } else {
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: result.error || "Gagal mengirim konfirmasi. Silakan coba lagi nanti.",
      })
    }
  }

  return (
    <WeddingSection 
      id="rsvp" 
      bgImageId="rsvp-bg" 
      bgVariants={bgVariants.zoomOut}
    >
      <motion.div 
        variants={staggerVariants.container} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-10"
      >
        {/* Header */}
        <motion.div variants={contentVariants.fadeInUp}>
          <h2 id="rsvp-heading" className="text-4xl font-headline italic mb-4">
            Reservasi
          </h2>
          <p className="text-white/50 text-caption font-body mb-6 tracking-wide px-4">
            {quotes.rsvpMessage}
          </p>
        </motion.div>
        
        {/* Form */}
        <motion.form 
          variants={contentVariants.fadeInUp} 
          className="space-y-6 text-left bg-glass p-8 rounded-[2rem] border-white/10"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Input 
            placeholder="Nama Lengkap" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-white/10 h-14 rounded-xl text-white focus:ring-1 focus:ring-white/40 font-body text-xs" 
            required
            aria-label="Nama lengkap"
          />
          
          <div className="flex gap-4" role="group" aria-label="Status kehadiran">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setStatus("Hadir")}
              className={cn(
                "flex-1 bg-white/5 border-white/10 h-14 rounded-xl transition-all font-body text-xs",
                status === "Hadir" && "bg-white text-black border-white"
              )}
              aria-pressed={status === "Hadir"}
            >
              Hadir
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setStatus("Absen")}
              className={cn(
                "flex-1 bg-white/5 border-white/10 h-14 rounded-xl transition-all font-body text-xs",
                status === "Absen" && "bg-white text-black border-white"
              )}
              aria-pressed={status === "Absen"}
            >
              Absen
            </Button>
          </div>
          
          <Textarea 
            placeholder="Pesan & Harapan..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent border-white/10 min-h-[120px] rounded-xl focus:ring-1 focus:ring-white/40 font-body text-xs resize-none" 
            required
            aria-label="Pesan dan harapan"
          />
          
          <Button 
            type="submit"
            disabled={isSending}
            className="w-full h-16 bg-white text-black hover:bg-white/90 font-bold tracking-[0.3em] rounded-2xl active:scale-95 transition-all shadow-xl text-xs"
          >
            {isSending ? (
              <>
                MENGIRIM... 
                <Loader2 className="ml-2 w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                KIRIM KONFIRMASI 
                <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </motion.form>
      </motion.div>
    </WeddingSection>
  )
}
