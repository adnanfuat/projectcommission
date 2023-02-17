import Link from "next/link"
import s from "./layout.module.css"
import { RiShieldUserFill, RiUserFill } from "react-icons/ri";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
            <div className={s.shell}>
                  
                  
                  <div className={s.menu}>
                      
                      <Link href={"/"}><img src='/images/logo.png' className={s.logo} /></Link>                 
                      <Link href={"/calc/users"}><RiShieldUserFill style={{color:"white", fontSize:75}}/></Link>     
                      <Link href={"/calc/profile"}><RiUserFill style={{color:"white", fontSize:75}}/></Link>

                  </div>

                  <div className={s.contents}> {children} </div>
                  

              </div>
    
  )
}
