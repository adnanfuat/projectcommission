import prisma from "@/src/db/prismadb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"



export default async function handler(req, res) {
  
    const session = await getServerSession(req, res, authOptions);

    let user = session?.user;

    let userinfo = await prisma?.contents.findFirst({where:{AND:[{slug_tr:user?.email}, {type:"userinfo"}]}})

    let userbigdata = userinfo?.bigdata ?? "{}"

    userbigdata = JSON.parse(userbigdata);

    let loggedusertype=userbigdata?.usertype; // bize bu isteği yönlendiren kullanıcı admin mi ?

              
    let reqbody = req?.body ?? {};

    let email=reqbody?.email


    console.log("new_userbigdatanew_userbigdata: ", email, loggedusertype);

    if (loggedusertype=="admin") {
      
       let finduser= await prisma?.contents.findFirst({where:{user:email}})
       
       if (finduser?.id) {
         let deleted_userinfo = await prisma?.contents.delete({where:{id:finduser?.id}});       
         
         if (finduser?.user){
           let delete_user = await prisma?.user.delete({where:{email:finduser?.user}});       
         }

         //console.log("asdasas:::",   deleted_userinfo);
       }

    }

    
    

    res.status(200).json({ name: 'John Doe' })

  }