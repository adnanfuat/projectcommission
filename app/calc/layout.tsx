import Link from "next/link"
import s from "./layout.module.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
            <div className={s.shell}>
                  
                  
                  <div className={s.menu}><Link href={"/"}><img src='/images/logo.jpg' className={s.logo} /></Link></div>
                  <div className={s.contents}> {children} </div>
                  

              </div>
    
  )
}
