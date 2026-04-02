import type { Variants, Transition } from "framer-motion"

// ============================================
// EASING PRESETS
// ============================================
export const easing = {
  // Smooth, elegant easing for most animations
  smooth: [0.22, 1, 0.36, 1] as const,
  // Subtle bounce for interactive elements
  spring: [0.34, 1.56, 0.64, 1] as const,
  // Dramatic entrance/exit
  dramatic: [0.77, 0, 0.175, 1] as const,
  // Standard ease out
  out: [0.0, 0, 0.2, 1] as const,
  // Standard ease in-out
  inOut: [0.4, 0, 0.2, 1] as const,
} as const

// ============================================
// TRANSITION PRESETS
// ============================================
export const transitions = {
  smooth: {
    duration: 0.8,
    ease: easing.smooth,
  },
  slow: {
    duration: 1.2,
    ease: easing.smooth,
  },
  fast: {
    duration: 0.4,
    ease: easing.out,
  },
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  dramatic: {
    duration: 1.2,
    ease: easing.dramatic,
  },
} satisfies Record<string, Transition>

// ============================================
// BACKGROUND ANIMATION VARIANTS
// ============================================
export const bgVariants = {
  zoomOut: {
    hidden: { scale: 1.15, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 2.5, ease: easing.smooth } 
    }
  },
  slideRight: {
    hidden: { x: "8%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 1.8, ease: easing.smooth } 
    }
  },
  slideUp: {
    hidden: { y: "10%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 2, ease: easing.smooth } 
    }
  },
  slideLeft: {
    hidden: { x: "-8%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 1.8, ease: easing.smooth } 
    }
  },
  zoomIn: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1.05, 
      opacity: 1, 
      transition: { duration: 3, ease: easing.smooth } 
    }
  },
  softFade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 2.2 } 
    }
  },
} satisfies Record<string, Variants>

// ============================================
// CONTENT ANIMATION VARIANTS  
// ============================================
export const contentVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: easing.smooth } 
    }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: easing.smooth } 
    }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, ease: easing.out } 
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: easing.out } 
    }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: easing.smooth } 
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 32 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: easing.smooth } 
    }
  },
} satisfies Record<string, Variants>

// ============================================
// STAGGER CONTAINERS
// ============================================
export const staggerVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      }
    }
  },
  containerSlow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.3 
      }
    }
  },
  containerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: 0.1 
      }
    }
  },
} satisfies Record<string, Variants>

// ============================================
// INTERACTIVE ELEMENT VARIANTS
// ============================================
export const interactiveVariants = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
  hoverLift: { y: -2, scale: 1.01 },
  press: { scale: 0.96 },
} as const

// ============================================
// LIST ITEM VARIANTS (for AnimatePresence)
// ============================================
export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: easing.out }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96,
    transition: { duration: 0.2, ease: easing.out }
  }
}

// ============================================
// PAGE TRANSITION VARIANTS
// ============================================
export const pageVariants = {
  cover: {
    initial: { opacity: 1 },
    exit: { 
      y: "-100%", 
      opacity: 0,
      transition: { duration: 1.2, ease: easing.dramatic }
    }
  },
  section: {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: easing.out }
    }
  },
} as const

// ============================================
// VIEWPORT OPTIONS
// ============================================
export const viewport = {
  // Most common - animate once when in view
  once: { once: true, margin: "-100px" as const },
  // For backgrounds - trigger earlier
  background: { once: true, amount: 0.1 as const },
  // For content - standard trigger
  content: { once: true, margin: "-50px" as const },
  // For repeated animations (use sparingly)
  repeat: { once: false, margin: "-100px" as const },
} as const

// ============================================
// HELPER: Create staggered children
// ============================================
export function createStaggeredChild(delay: number = 0): Variants {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: easing.smooth,
        delay 
      }
    }
  }
}

// ============================================
// HELPER: Reduced motion variants
// ============================================
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
}
