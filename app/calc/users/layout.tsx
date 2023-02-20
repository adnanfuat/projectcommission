import Link from "next/link"
import s from "./layout.module.css"
import { RiShieldUserFill } from "react-icons/ri";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (    
            <div className={s.shell}>
              {/* İçerikler buradan gelecek */}
              {children}
            </div>    
  )
}
