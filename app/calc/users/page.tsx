// import Modal from 'react-modal';

// import Head from 'next/head';
// import {LayoutMain} from "@/components/layouts/console/layoutmain"; 
// import {useQuery} from "react-query";
// import {graphcms} from "@/constants/graphcms";
// import { SwissArmyKnifeQuery } from '@/__queries/global/swissarmyknife/swissarmyknifequery';
import s from "./page.module.css";
import prisma from "@/src/db/prismadb";
import {JVIEW} from "./jview";

//  console.log("prisma::::..", prisma)
// import { useState } from 'react';



export default async function Users  () {


  const users = await prisma.user.findMany({
  });




  // console.log("notes::::", notes);

  
//   const fetcher =async ()=> {return await graphcms?.request(SwissArmyKnifeQuery, {data:{type:"users"}})};    
                                    
//   const {  isError, isSuccess, data } = useQuery( ["SwissArmyKnifeQuery" ], () => fetcher() ,       // Burada sorguyu tekrar tekrar çekmemesi gerkeiyor ama çekiyor. Şimdilik pas geçtim, İleriye doğru çözülebilir...    
//                                                       {
//                                                             // refetchOnWindowFocus:true
//                                                             // refetchOnWindowFocus: false,
//                                                             // refetchOnMount: false,
//                                                             // refetchOnReconnect: false,
//                                                             // retry: false,
//                                                             // staleTime: 24*60*60,                                                     
//                                                       }
//           );
// let users=data?.swissarmyknifequery?.o_key_1;     



// const [useremail, setuseremail] = useState(null);
// const [modalIsOpen, setIsOpen] = useState(false);
// function closeModal() { setIsOpen(false); }

// let userinfojson=users?.find(user=>user?.email==useremail)?.bigdata;



  return (
    <div>
    
    
            <div className={s.shell}>                  
                          <div className={s.users}>
                                    { users?.map((user, index)=>{ 
                                      
                                                    return <div className={s.userrow} key={index}>  
                                                                              
                                                                              <img src={user?.image}  className={s.image} />
                                                                              
                                                                              <div className={s.userdata}>
                                                                                  <span>{user?.name}</span>
                                                                                  <UserData props={{email:user?.email}}/>
                                                                                  {/* <div><button  className={s.button} onClick={()=>{setIsOpen(true); setuseremail(user?.email)}}>Tıkla</button></div> */}

                                                                              </div> 
                                                            </div>
                                            }) }            
                          </div>    

                          



                                                

                  </div>

              </div>
    
  )
}







const UserData  = async ({props}) => {

  let {email} = props ?? {}

  
  const userdata = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:email}]}});

  let bigdata= userdata?.bigdata ? JSON.parse(userdata?.bigdata) :  {}

  // console.log("userdata::::", userdata)
  
  return (
    <div>
      {email}    



      <JVIEW props={{bigdata}}/>
      Ara yöne
    </div>
  )
}



// userdata:JSON.stringify(userdata)


