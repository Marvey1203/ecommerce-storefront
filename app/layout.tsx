'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/app/main/header'
import Footer from '@/app/main/footer'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header/>
        <div className="w-3/4 mx-auto">
          {children}
        </div>
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}
