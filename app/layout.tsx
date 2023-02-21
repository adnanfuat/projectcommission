
import { RiCalculatorFill } from "react-icons/ri";
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import  "@/styles/globals.css"
import LayoutInner from "./layoutinner";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import s from "./layout.module.css"
import prisma from "@/src/db/prismadb";
import {SignIn, SignOut} from "@/src/components/loginactions";
import Link from 'next/link';

import { GiCardExchange } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineArchitecture } from "react-icons/md";
import { RiShieldUserFill, RiUserFill } from "react-icons/ri";





export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,  
}) {


  const session = await getServerSession(authOptions);
  let userinfo = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:session?.user?.email}]} });
  let bigdata=userinfo?.bigdata ?? "{}";
  // console.log("bigdatabigdata: ", userinfo)
  bigdata=JSON.parse(bigdata);
  userinfo={...userinfo, bigdata, createdat:null, updatedat:null};
  let loggedusertype=bigdata?.usertype;

   console.log("asdsadsadsdasda asdsdasdasdasad", userinfo);

  return (
    <html className={inter.className}>      
                          <body className={s.bg}>
                              <div className={s.menuwr}>

                                    <div className={s.leftwr}>                                
                                          <div className={s.logowr}>
                                          <Link href={"/"} title='PROJE KOMİSYONU'>
                                                <img src='/images/logo.png' width={"auto"} height={"auto"}/>
                                          </Link>

                                          </div>                                         
                                          <span>PROJE KOMİSYONU</span>
                                    </div>




                                        <div className={s.menu}>


                                                      {(session && (loggedusertype=="admin" || loggedusertype=="kullanici" || loggedusertype=="admin-muhendis" || loggedusertype=="admin-mimar")) && 
                                                        <Link href={"/calc"} title="Proje hesaplama"><RiCalculatorFill style={{color:"white", fontSize:42}}/> </Link>}


                                                      {(loggedusertype=="admin") && 
                                                        <Link href={"/calc/users?page=admin"} title="Tüm kullanıcılar"><RiShieldUserFill style={{color:"white", fontSize:40}}/></Link>}                                                                                 
                                                      {(loggedusertype=="admin-mimar") && 
                                                        <Link href={"/calc/users?page=architect"}  title="Yönetici - Mimar"><MdOutlineArchitecture style={{color:"white", fontSize:40}}/></Link>}                           
                                                      {(loggedusertype=="admin-muhendis") && 
                                                        <Link href={"/calc/users?page=engineer"}  title="Yönetici - Mühendis"><FaBuilding style={{color:"white", fontSize:30}}/></Link>}                           
                                                                          
                                                      {/* {(1==1) && 
                                                        <Link href={"/calc/profile"} title="Profil"><RiUserFill style={{color:"white", fontSize:25}}/></Link>
                                                      } */}
                                        </div>


                                        <div className={s.rightwr}>

                                              { session ? <SignOut/> : <SignIn/> }
                                              
                                                        {session && <Link href={"/calc/profile"} title="Profil ayarlarına git"><div className={s.namewr}>                                                                                                                                        
                                                                              <div className={s.avatarwr}> <img src={session?.user?.image} width={40} height={40}/> </div>                                                                             
                                                                              <span>{ bigdata?.name } </span>                                                                             
                                                        </div></Link>  

                                              }

                                        </div>


                              </div>



                              
                              <LayoutInner userinfo={userinfo}>
                                


                                    {children}                          
                              </LayoutInner>
                          
                          
                          </body>                
    </html>
  )
}
