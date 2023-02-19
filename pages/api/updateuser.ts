import prisma from "@/src/db/prismadb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"



export default async function handler(req, res) {
  
    const session = await getServerSession(req, res, authOptions);

    let user = session?.user;

    let userinfo = await prisma?.contents.findFirst({where:{AND:[{slug_tr:user?.email}, {type:"userinfo"}]}})

    let userbigdata = userinfo?.bigdata ?? "{}"

    userbigdata = JSON.parse(userbigdata);
      
    
    let new_userbigdata = req?.body ?? {};

    // console.log("new_userbigdatanew_userbigdata: ", new_userbigdata);

    
    new_userbigdata={...userbigdata, ...new_userbigdata}

    let updated_userinfo = await prisma?.contents.update({where:{id:userinfo?.id}, data:{...userinfo, parent_slug:new_userbigdata?.jobtype, bigdata:JSON.stringify(new_userbigdata)}})

    //console.log("asdasas:::",   updated_userinfo);


    res.status(200).json({ name: 'John Doe' })

  }