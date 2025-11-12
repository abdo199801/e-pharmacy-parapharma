// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'  // ✅ KEEP THIS ONE

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Pharma - Votre Pharmacie en Ligne | Kenitra',
  description: 'Plateforme de gestion des pharmacies et produits pharmaceutiques à Kenitra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}