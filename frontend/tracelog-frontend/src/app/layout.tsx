import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TraceLog',
  description: 'Observability for every database you run.',
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
