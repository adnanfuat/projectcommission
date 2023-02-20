"use client"
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { QueryClientProvider, QueryClient } from "react-query";
// import { cloneElement } from "react";
import  "@/styles/globals.css"

export default function LayoutInner({
  children,  
  userinfo
}: {
  children: React.ReactNode,  
  userinfo:object
}) {


  const queryClient = new QueryClient();
    //console.log("test::::", userinfo)

  return (
          
                <QueryClientProvider client={queryClient}>                                                 
                                          {/* {cloneElement(children,  userinfo )}  */}
                                          {children}
                </QueryClientProvider>
          
        )
}
