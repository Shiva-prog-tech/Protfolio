import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D Portfolio - Software Developer',
  description: 'Next-generation software developer portfolio with stunning 3D animations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
