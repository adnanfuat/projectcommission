

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { GiCardExchange } from "react-icons/gi";

import { FaBuilding } from "react-icons/fa";
import { MdOutlineArchitecture } from "react-icons/md";
import Link from "next/link"
import s from "./layout.module.css"
import { RiShieldUserFill, RiUserFill } from "react-icons/ri";
import prisma from "@/src/db/prismadb";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  const userinfo = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:session?.user?.email}]} });
  let bigdata=userinfo?.bigdata;
  bigdata=JSON.parse(bigdata);

  let loggedusertype=bigdata?.usertype;


  return (
    
            <div className={s.shell}>aaaassasasa {loggedusertype}
                  
                  
                  <div className={s.menu}>
                      
                      <Link href={"/"}  title="Ana sayfa"><img src='/images/logo.png' className={s.logo} /></Link>                 
                      {(loggedusertype=="admin") && 
                        <Link href={"/calc/users?page=admin"}  title="Tüm kullanıcılar"><RiShieldUserFill style={{color:"white", fontSize:75}}/></Link>}                           
                      {(loggedusertype=="tasnif") && 
                        <Link href={"/calc/users?page=classification"}  title="Tasnif"><GiCardExchange style={{color:"white", fontSize:75}}/></Link>}                           
                      {(loggedusertype=="admin-mimar") && 
                        <Link href={"/calc/users?page=architect"}  title="Yönetici - Mimar"><MdOutlineArchitecture style={{color:"white", fontSize:75}}/></Link>}                           
                      {(loggedusertype=="admin-muhendis") && 
                        <Link href={"/calc/users?page=engineer"}  title="Yönetici - Mühendis"><FaBuilding style={{color:"white", fontSize:65}}/></Link>}                           
                                          
                      {(1==1) && 
                        <Link href={"/calc/profile"} title="Profil"><RiUserFill style={{color:"white", fontSize:75}}/></Link>}

                  </div>

                  <div className={s.contents}> {children} </div>
                  

              </div>
    
  )
}
