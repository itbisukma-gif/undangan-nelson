"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, User2, Loader2 } from "lucide-react"
import { WeddingSection } from "@/components/WeddingSection"
import { cn } from "@/lib/utils"
import { quotes } from "@/lib/wedding-data"
import { useWishes } from "@/hooks/useWishes"
import { 
  bgVariants, 
  staggerVariants, 
  contentVariants,
  listItemVariants 
} from "@/lib/animations"

export function WishesSection() {
  const { wishes, isLoading } = useWishes()

  return (
    <WeddingSection 
      id="wishes" 
      bgImageId="wishes-bg" 
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
          <MessageSquare className="w-8 h-8 mx-auto text-white/30" aria-hidden="true" />
          <h2 id="wishes-heading" className="text-4xl font-headline italic mt-6 mb-4">
            Ucapan & Doa
          </h2>
          <p className="text-white/50 text-caption font-body tracking-wide leading-relaxed px-4">
            {quotes.wishesMessage}
          </p>
        </motion.div>
        
        {/* Wishes List */}
        <motion.div 
          variants={contentVariants.fadeInUp} 
          className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar"
          role="list"
          aria-label="Daftar ucapan"
        >
          {isLoading ? (
            <div className="py-10 text-white/40 text-sm italic flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Memuat ucapan...
            </div>
          ) : wishes && wishes.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {wishes.map((wish) => (
                <motion.article 
                  key={wish.id}
                  layout
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={cn(
                    "p-6 rounded-2xl bg-glass border-white/10 text-left space-y-3",
                    wish.isPending && "animate-pulse"
                  )}
                  role="listitem"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                        {wish.isPending ? (
                          <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                        ) : (
                          <User2 className="w-4 h-4 text-white/40" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="text-sm font-headline italic text-white/90 truncate">
                          {wish.name}
                        </p>
                        {wish.isPending && (
                          <span className="text-[8px] uppercase tracking-widest text-white/40 flex-shrink-0">
                            Mengirim...
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <span className={cn(
                      "text-overline uppercase tracking-widest font-bold px-2 py-1 rounded-md flex-shrink-0",
                      wish.status === "Hadir" 
                        ? "text-green-400 bg-green-400/10" 
                        : "text-red-400 bg-red-400/10"
                    )}>
                      {wish.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-white/60 font-body italic leading-relaxed">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          ) : (
            <div className="py-10 text-white/40 text-sm italic">
              Belum ada ucapan. Jadilah yang pertama!
            </div>
          )}
        </motion.div>
      </motion.div>
    </WeddingSection>
  )
}
