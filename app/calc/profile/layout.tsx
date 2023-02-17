import Link from "next/link"
import s from "./layout.module.css"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (    
            <div className={s.shell}>

              Profil datalar...

              {children}

            </div>    
  )
}
