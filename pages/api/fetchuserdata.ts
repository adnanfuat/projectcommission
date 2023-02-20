import prisma from "@/src/db/prismadb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"


export default async function handler(req, res) {

    const session = await getServerSession(req, res, authOptions);

    //  console.log("session::: ", session);

     if (session) {

       let user = session?.user;    
       let userinfo = await prisma?.contents.findFirst({where:{AND:[{slug_tr:user?.email}, {type:"userinfo"}]}})
       res.status(200).json({ userinfo })
       
     } else
     {
      res.status(200).json({ userinfo:undefined })
     }
    


  }