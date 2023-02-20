import s from "./page.module.css";
import prisma from "@/src/db/prismadb";
import {JVIEW} from "./jview";

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"


export default async function Users  (params) {
  
  let page = params?.searchParams?.page
  // console.log("paramssss:::--> ", page);  
  // ?page=classification
  const session = await getServerSession(authOptions);

  let user= session?.user;

  
  const userinfo = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:user?.email}]} });
  let bigdata=userinfo?.bigdata;
  bigdata=JSON.parse(bigdata);

  let loggedusertype=bigdata?.usertype;
  
  // console.log("session:::::", loggedusertype)

  let  users=[]
  
  let title=""


  if(page=="admin") 
  {
    users = await prisma.contents.findMany({ where:{AND:[ {type:"userinfo"}]}});
    title="Tüm kullanıcılar"
  } 
  else if(page=="classification") 
  {
    users = await prisma.contents.findMany({ where:{AND:[{bigparent_slug:"standart"}, {type:"userinfo"}]}});
    title="Tasnif"
  }
  else if(page=="architect") 
  {
    users = await prisma.contents.findMany({ where:{AND:[{bigparent_slug:"kullanici"}, {parent_slug:"architect"}, {type:"userinfo"}]}});
    title="Yönetici Mimar"
  }
  else if(page=="engineer") 
  {
    users = await prisma.contents.findMany({ where:{AND:[{bigparent_slug:"kullanici"}, {parent_slug:"engineer"}, {type:"userinfo"}]}});
    title="Yönetici Mühendis"
  }




  return (
    
    
    
            <div className={s.shell}>         
                          <h2>{title}</h2>         
                          {users?.length>0 && <div className={s.users}>
                                    { users?.map((user, index)=>{ 

                                              user= {...user, bigdata:JSON.parse(user?.bigdata)}
                                      
                                              

                                                    return <div className={s.userrow} key={index}>  
                                                                              
                                                                              <div><img src={user?.img_tr}  className={s.image} /></div>
                                                                              
                                                                              <div className={s.userdata}>
                                                                                  <h3>{user?.title_tr}</h3>
                                                                                  <div>{user?.bigdata?.usertype}</div>
                                                                                  <div>{user?.bigdata?.jobtype} / {user?.bigdata?.code}</div>                                                                                  
                                                                                  <UserData props={{email:user?.slug_tr,  loggedusertype}}/>
                                                                                  {/* <div><button  className={s.button} onClick={()=>{setIsOpen(true); setuseremail(user?.email)}}>Tıkla</button></div> */}

                                                                              </div> 
                                                            </div>
                                            }) }            
                          </div> }   


                          {!(users?.length>0) && <div className={s.empty}>
                              Kayıt yok
                            </div>
                          }

                          



                                                

                  </div>

              
    
  )
}







const UserData  = async ({props}) => {

  let {email, loggedusertype} = props ?? {}

  
  const userdata = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:email}]}});

  let bigdata= userdata?.bigdata ? JSON.parse(userdata?.bigdata) :  {}

  // console.log("userdata::::", userdata)
  
  return (
    <div>      
      <JVIEW props={{bigdata, loggedusertype, email}}/>      
    </div>
  )
}



// userdata:JSON.stringify(userdata)


