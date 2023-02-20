
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import  "@/styles/globals.css"
import LayoutInner from "./layoutinner";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import s from "./layout.module.css"
import prisma from "@/src/db/prismadb";
import {SignIn, SignOut} from "@/src/components/loginactions";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,  
}) {


  const session = await getServerSession(authOptions);
  const userinfo = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:session?.user?.email}]} });
  let bigdata=userinfo?.bigdata ?? "{}";
  // console.log("bigdatabigdata: ", userinfo)
  bigdata=JSON.parse(bigdata);
  let loggedusertype=bigdata?.usertype;


  return (
    <html className={inter.className}>
      
                          <body>
                              <div className={s.menuwr}>

                                    {session ? <SignOut/> : <SignIn/>}
                                    
                                              <div className={s.namewr}>                                                                                                                                        
                                                                    <div className={s.avatarwr}> <img src={session?.user?.image} width={40} height={40}/> </div>
                                                                    {session?.user?.name}
                                              </div> 

                              </div>
                              <LayoutInner>
                                    {children}                          
                              </LayoutInner>
                          </body>                
    </html>
  )
}
