import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Playfair_Display, PT_Sans } from 'next/font/google'
import { FirebaseClientProvider } from '@/firebase/client-provider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  style: ['normal', 'italic'],
})

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'The Wedding of Nelson & Suni',
  description: 'Undangan Pernikahan Nelson Mandela Sianturi & Suni Manik - 18 April 2026',
  openGraph: {
    title: 'The Wedding of Nelson & Suni',
    description: 'Undangan Pernikahan Nelson Mandela Sianturi & Suni Manik - 18 April 2026',
    images: [
      {
        url: '/Background/Page_2.png',
        width: 1200,
        height: 630,
        alt: 'Wedding of Nelson & Suni',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Wedding of Nelson & Suni',
    description: 'Undangan Pernikahan Nelson Mandela Sianturi & Suni Manik - 18 April 2026',
    images: ['/Background/Page_2.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${ptSans.variable} dark scroll-smooth`}>
      <body className="font-body antialiased selection:bg-white selection:text-black overflow-x-hidden">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
