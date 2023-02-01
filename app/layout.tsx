import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import  "@/styles/globals.css"
import Head from './head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className}>

      <body>{children}</body>
    </html>
  )
}
