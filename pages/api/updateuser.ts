import prisma from "@/src/db/prismadb";


export default async function handler(req, res) {

    let userinfo = await prisma?.contents.findFirst({where:{AND:[{slug_tr:"yigitruzgaruzun@gmail.com"}, {type:"userinfo"}]}})

    let userbigdata = userinfo?.bigdata ?? "{}"

    userbigdata = JSON.parse(userbigdata);
      
    
    let new_userbigdata = req?.body ?? {};

    
    new_userbigdata={...userbigdata, ...new_userbigdata}

    let updated_userinfo = await prisma?.contents.update({where:{id:userinfo?.id}, data:{...userinfo, bigdata:JSON.stringify(new_userbigdata)}})

    //console.log("asdasas:::",   updated_userinfo);


    res.status(200).json({ name: 'John Doe' })

  }