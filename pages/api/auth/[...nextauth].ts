
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import prisma from "@/src/db/prismadb";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions: NextAuthOptions = 
  {
  
    providers: [ GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, }), ],
    
    callbacks:{
      
      async session({ session, token,user }) {
        
  
                  // let tokenObj=await db.session.findFirst({where:{userId:user?.id}})        
                  // let userinfo=await db.contents.findFirst({select:{bigdata:true, slug_tr:true}, where:{AND:[{type:"userinfo"}, {slug_tr:user?.email}]}}); //devamlı bu verileri çekmesin diye cacheleme yapılabilir.. ya da backendde cachleme yapılabilir..
  
                  // let companies=await db.contents.findMany({select:{title_tr:true, slug_tr:true}, where:{AND:[{type:"company"}, {user:user?.email}]}}); //devamlı bu verileri çekmesin diye cacheleme yapılabilir.. ya da backendde cachleme yapılabilir..                
  
                  //               userinfo=parseContentFunc({result:userinfo});                        
                  //               session.user.accessToken = tokenObj?.sessionToken;
                  //               session.user.userinfo=userinfo;        
                  //               session.user.companies=companies;        
                                
  
                                 return Promise.resolve(session);
    
                                             }                                               
  },
  
  events:{
    async createUser({user}) {     
                                  // let result=  await graphcms?.request(SwissArmyKnifeMutation,{data:{type:"initializenewuser", email:user?.email}});        
                                  
                                  let bigdata=                                  
                                    {
                                      name :user?.name,
                                      usertype: "yeniuye",
                                      jobtype: "",
                                      code: 0
                                    }                                    
                                  
                                    bigdata=JSON.stringify(bigdata)

                                  let userinfo=await prisma.contents.create({data:{bigdata, type:"userinfo", img_tr:user?.image ,slug_tr:user?.email, bigparent_slug:"yeniuye" ,  title_tr:user?.name, user:user?.email  }});

                             }
  },
  
                                                                 
  adapter: PrismaAdapter(prisma),
    
  //secret: "Fnss2P9BIr9XvOTq+jIiv2KzEIT+HYR37eV8+iBWa9o=", // "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  debug:false,
  secret:process.env.NEXTAUTH_SECRET
  
  }


// console.log("authOptionsauthOptions", authOptions)

export default NextAuth(authOptions)