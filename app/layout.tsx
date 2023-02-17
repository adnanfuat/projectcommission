import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import  "@/styles/globals.css"
import Head from './head'
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,  
}) {
  return (
    <html className={inter.className}>
        {/* <SessionProvider session={session}> */}
          <body>{children}</body>
      {/* </SessionProvider> */}
    </html>
  )
}
