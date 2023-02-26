import prisma from "@/src/db/prismadb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"



export default async function handler(req, res) {
  
    const session = await getServerSession(req, res, authOptions);

    
    let user = session?.user;
    let userinfo = await prisma?.contents.findFirst({where:{AND:[{slug_tr:user?.email}, {type:"userinfo"}]}})
    let userbigdata = userinfo?.bigdata ?? "{}"
    userbigdata = JSON.parse(userbigdata);

    let usertype=userbigdata?.usertype;

    if (!(usertype=="admin" || usertype=="admin-mimar" || usertype=="admin-muhendis" || usertype=="tasnif"))  // Tasnifçi ve admin dışından gelenleri reddet
    {
      console.log("Erişim reddedildi",usertype)
      res.status(500).json({ output: 'Erişim reddedildi',usertype })
    }
    


    let related_userinfo = await prisma?.contents.findFirst({where:{AND:[{slug_tr:req?.body?.email}, {type:"userinfo"}]}})
    let related_userbigdata = related_userinfo?.bigdata ?? "{}"
    related_userbigdata = JSON.parse(related_userbigdata);

    
    
    
    related_userbigdata={...related_userbigdata, usertype:req?.body?.usertype}
    // console.log("dassadsadsa", related_userinfo)

    let update_related_userinfo = await prisma?.contents.update({where:{id:related_userinfo?.id}, data:{ bigparent_slug:req?.body?.usertype, bigdata:JSON.stringify(related_userbigdata)}})



    res.status(200).json({ name: 'John Doe' })

  }