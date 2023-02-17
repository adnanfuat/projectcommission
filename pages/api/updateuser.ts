import prisma from "@/src/db/prismadb";


export default async function handler(req, res) {

    let userinfo = await prisma?.contents.findFirst({where:{AND:[{slug_tr:"yigitruzgaruzun@gmail.com"}, {type:"userinfo"}]}})

    console.log("tamamammamama", userinfo);

    res.status(200).json({ name: 'John Doe' })

  }