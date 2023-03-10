import s from "./page.module.css";
import prisma from "@/src/db/prismadb";
import {JVIEW} from "./jview";

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from 'next/navigation';


export default async function Users  (params) {
  
  let page = params?.searchParams?.page
  // console.log("paramssss:::--> ", page);  
  // ?page=classification
  const session = await getServerSession(authOptions);
  session==null ? redirect('/') : ""
  let user= session?.user;

    
  const userinfo = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:user?.email}]} });
  let bigdata=userinfo?.bigdata;
  bigdata=JSON.parse(bigdata);

  let loggedusertype=bigdata?.usertype;
  
  console.log("session:::::", loggedusertype,session)

  let  users=[]
  
  let title=""


  if(page=="admin") 
  {
    users = await prisma.contents.findMany({ where:{AND:[ {type:"userinfo"}]}});
    title="Tüm kullanıcılar";
    
    if (loggedusertype!=="admin" ) return <div style={{color:"white", padding:50}}>Yetkiniz olmayan alandasınız</div>

  }   
  else if(page=="architect") 
  {
    users = await prisma.contents.findMany({ where:{AND:[ {parent_slug:"architect"}, {type:"userinfo"}]}});
    title="Yönetici Mimar";

    if (loggedusertype!=="admin-mimar" ) return <div style={{color:"white", padding:50}}>Yetkiniz olmayan alandasınız</div>


  }
  else if(page=="engineer") 
  {
    users = await prisma.contents.findMany({ where:{AND:[ {parent_slug:"engineer"}, {type:"userinfo"}]}});
    title="Yönetici Mühendis";

    if (loggedusertype!=="admin-muhendis" ) return <div style={{color:"white", padding:50}}>Yetkiniz olmayan alandasınız</div>
  }

  users=users?.map(user=>{ 


      if (user?.bigdata && typeof user?.bigdata =="string") {
        // console.log("user::::: ", user)
        user={...user, bigdata:JSON.parse(user?.bigdata)}
      }         
      return user    
  })


  users=[...users?.filter(user=>user?.bigparent_slug=="yeniuye"), ...users?.filter(user=>user?.bigparent_slug!=="yeniuye")]



  // console.log("userssss: ", users)


  return (
    
    
    
            <div className={s.shell}>         
                          <h2>{title} - {users?.length}</h2>         
                          {users?.length>0 && <div className={s.users}>
                                    { users?.map((user, index)=>{ 

                                              // user= {...user, bigdata:JSON.parse(user?.bigdata)}
                                      
                                              

                                                    return <div className={s.userrow} key={`${index}-${user.slug_tr}`}  style={{border:user?.bigparent_slug=="yeniuye" ? "2px solid green" : "2px solid white"}}>  
                                                                              
                                                                              <img src={user?.img_tr}  className={s.image} />
                                                                              
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
    <div >      
      <JVIEW props={{bigdata, loggedusertype, email}}/>      
    </div>
  )
}



// userdata:JSON.stringify(userdata)


