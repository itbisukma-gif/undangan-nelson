import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Playfair_Display, PT_Sans } from 'next/font/google'

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${ptSans.variable} dark scroll-smooth`}>
      <body className="font-body antialiased selection:bg-white selection:text-black overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
