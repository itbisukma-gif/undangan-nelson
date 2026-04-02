"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Copy, Check } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { bankAccounts, quotes } from "@/lib/wedding-data"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants 
} from "@/lib/animations"

export function GiftSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""))
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    toast({ description: "Nomor rekening berhasil disalin." })
  }

  return (
    <WeddingSection 
      id="gift" 
      bgImageId="gift-bg" 
      bgVariants={bgVariants.softFade}
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
          <Gift className="w-8 h-8 mx-auto text-white/30" aria-hidden="true" />
          <h2 id="gift-heading" className="text-4xl font-headline italic mt-6 mb-4">
            Hadiah Cinta
          </h2>
          <p className="text-white/50 text-caption font-body tracking-wide leading-relaxed px-4 max-w-sm mx-auto">
            {quotes.giftMessage}
          </p>
        </motion.div>
        
        {/* Bank Accounts */}
        <div className="grid gap-6">
          {bankAccounts.map((account) => (
            <motion.div key={account.id} variants={contentVariants.fadeInUp}>
              <div className="p-8 rounded-[2rem] bg-glass border-white/10">
                <p className="font-bold text-overline tracking-[0.3em] uppercase mb-4 opacity-70 font-body">
                  {account.bankName} ({account.bankCode})
                </p>
                
                <div className="flex items-center justify-between gap-4 mb-4">
                  <p 
                    className="text-xl md:text-3xl font-mono tracking-tighter select-all"
                    aria-label={`Account number: ${account.accountNumber}`}
                  >
                    {account.accountNumber}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-10 h-10 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-90"
                    onClick={() => handleCopy(account.accountNumber, account.id)}
                    aria-label={`Copy ${account.bankCode} account number`}
                  >
                    {copiedId === account.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <p className="text-white/40 text-overline uppercase tracking-widest font-body">
                  a.n {account.accountHolder}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </WeddingSection>
  )
}
