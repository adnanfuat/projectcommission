

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

import s from "./layout.module.css"
import prisma from "@/src/db/prismadb";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  const userinfo = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:session?.user?.email}]} });
  let bigdata=userinfo?.bigdata ?? "{}";
  // console.log("bigdatabigdata: ", userinfo)
  bigdata=JSON.parse(bigdata);
  let loggedusertype=bigdata?.usertype;


  return (
    
            <div className={s.shell}>
                  
                  


                      <div className={s.contents}> {children} </div>

              </div>
    
  )
}
