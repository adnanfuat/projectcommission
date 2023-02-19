"use client"
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { QueryClientProvider, QueryClient } from "react-query";

import  "@/styles/globals.css"
import Head from './head'
import { SessionProvider } from "next-auth/react"




export default function RootLayout({
  children,
}: {
  children: React.ReactNode,  
}) {


  const queryClient = new QueryClient();

  return (
    <html className={inter.className}>
          <QueryClientProvider client={queryClient}> 

        {/* <SessionProvider session={session}> */}
          <body>{children}</body>
      {/* </SessionProvider> */}
      </QueryClientProvider>
    </html>
  )
}
