// ============================================
// WEDDING DATA - Nelson & Suni
// ============================================

export const WEDDING_DATE = "2026-04-18T09:00:00"
export const WEDDING_DATE_FORMATTED = "18 . 04 . 2026"
export const WEDDING_DATE_FULL = "Sabtu, 18 April 2026"

// ============================================
// COUPLE INFORMATION
// ============================================
export interface Person {
  name: string
  fullName: string
  parentInfo: string
  photo: string
  instagram: string
}

export const groom: Person = {
  name: "Nelson",
  fullName: "Nelson Mandela Sianturi",
  parentInfo: "Putra ke-8 dari Bapak A. Sianturi dan Ibu D. br. Sinambela",
  photo: "/bride/male.svg",
  instagram: "https://instagram.com/nelson_antury",
}

export const bride: Person = {
  name: "Suni",
  fullName: "Suni Manik",
  parentInfo: "Putri ke-6 dari Bapak M. Manik dan Ibu L. br. Simangunsong",
  photo: "/bride/female.svg",
  instagram: "https://instagram.com/suny_manik",
}

export const coupleName = `${groom.name} & ${bride.name}`

// ============================================
// EVENT DETAILS
// ============================================
export interface EventInfo {
  title: string
  time: string
  date?: string
  location?: string
}

export const events: EventInfo[] = [
  {
    title: "Pemberkatan",
    time: "09.00 - 11.00 WIB",
    date: WEDDING_DATE_FULL,
  },
  {
    title: "Acara Adat",
    time: "12.00 - Selesai",
    location: "Lumban Pinasa, Desa Gonting Garoga, Kec. Garoga",
  },
]

export const locationInfo = {
  name: "Lumban Pinasa, Desa Gonting Garoga",
  googleMapsUrl: "https://maps.app.goo.gl/7kNvkWRb4PJjRxNN6",
}

// ============================================
// STORY TIMELINE
// ============================================
export interface StoryItem {
  year: string
  title: string
  description: string
}

export const storyTimeline: StoryItem[] = [
  {
    year: "2018",
    title: "Pertemuan Pertama",
    description:
      "Pertemuan awal kami yang bersemi saat diperkenalkan oleh kakak tercinta. Sebuah awal sederhana yang menuntun pada ikatan yang tak terputus.",
  },
  {
    year: "2018",
    title: "Komitmen Bersama",
    description:
      "Di tahun yang sama, kami menyadari bahwa satu sama lain adalah pelabuhan terakhir. Kami berjanji untuk saling menguatkan dalam setiap langkah.",
  },
  {
    year: "2026",
    title: "Lembaran Baru",
    description:
      "Kini, kami bersiap melangkah ke gerbang pernikahan, mengikat janji suci di hadapan Tuhan dan keluarga tercinta untuk selamanya.",
  },
]

// ============================================
// GALLERY IMAGES
// ============================================
export interface GalleryImage {
  id: number
  url: string
  alt?: string
}

export const galleryImages: GalleryImage[] = [
  { id: 1, url: "/Background/Page_1.png", alt: "Pre-wedding photo 1" },
  { id: 2, url: "/Background/Page_2.png", alt: "Pre-wedding photo 2" },
  { id: 3, url: "/Background/Page_3.png", alt: "Pre-wedding photo 3" },
  { id: 4, url: "/Background/Page_4.png", alt: "Pre-wedding photo 4" },
  { id: 5, url: "/Background/Page_6.png", alt: "Pre-wedding photo 5" },
  { id: 6, url: "/Background/Page_7.png", alt: "Pre-wedding photo 6" },
]

// ============================================
// BANK ACCOUNTS FOR GIFTS
// ============================================
export interface BankAccount {
  id: string
  bankName: string
  bankCode: string
  accountNumber: string
  accountHolder: string
}

export const bankAccounts: BankAccount[] = [
  {
    id: "bri",
    bankName: "Bank Rakyat Indonesia",
    bankCode: "BRI",
    accountNumber: "779701009947530",
    accountHolder: "Nelson Mandela Sianturi",
  },
  {
    id: "bni",
    bankName: "Bank Negara Indonesia",
    bankCode: "BNI",
    accountNumber: "1977860504",
    accountHolder: "Nelson Mandela Sianturi",
  },
]

// ============================================
// NAVIGATION SECTIONS
// ============================================
export interface NavSection {
  id: string
  label: string
  icon?: string
}

export const navSections: NavSection[] = [
  { id: "welcome", label: "Beranda" },
  { id: "couple", label: "Mempelai" },
  { id: "story", label: "Kisah" },
  { id: "event", label: "Acara" },
  { id: "gallery", label: "Galeri" },
  { id: "gift", label: "Hadiah" },
  { id: "rsvp", label: "RSVP" },
  { id: "wishes", label: "Ucapan" },
]

// ============================================
// QUOTES & TEXT
// ============================================
export const quotes = {
  corinthians:
    "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.",
  invitation: "Undangan Pernikahan",
  theWeddingOf: "The Wedding Of",
  exclusiveFor: "Eksklusif Untuk",
  openInvitation: "BUKA UNDANGAN",
  giftMessage:
    "Kehadiran Anda adalah kado terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, silakan melalui saluran berikut:",
  rsvpMessage:
    "Mohon konfirmasi kehadiran Anda untuk menyempurnakan hari bahagia kami.",
  wishesMessage:
    "Terima kasih atas doa dan harapan baik Anda untuk kami berdua.",
}

// ============================================
// BACKGROUND IMAGE MAPPING
// ============================================
export const sectionBackgrounds: Record<string, string> = {
  cover: "cover-bg",
  welcome: "welcome-bg",
  couple: "couple-bg",
  story: "story-bg",
  event: "event-bg",
  gallery: "gallery-bg",
  gift: "gift-bg",
  rsvp: "rsvp-bg",
  wishes: "wishes-bg",
  closing: "closing-bg",
}

// ============================================
// AUDIO
// ============================================
export const backgroundMusic = {
  src: "/backgroud_song/Holong Panimpuli.webm",
  title: "Holong Panimpuli",
}
