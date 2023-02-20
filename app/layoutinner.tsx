"use client"
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { QueryClientProvider, QueryClient } from "react-query";

import  "@/styles/globals.css"

export default function LayoutInner({
  children,
}: {
  children: React.ReactNode,  
}) {


  const queryClient = new QueryClient();

  return (
          
                <QueryClientProvider client={queryClient}>       
                                          <div>{children}</div>
                </QueryClientProvider>
          
        )
}
