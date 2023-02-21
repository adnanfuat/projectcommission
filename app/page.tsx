// "use client"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Head from 'next/head';
import s from  "./page.module.css"
import { Denk_One } from '@next/font/google';
import prisma from "@/src/db/prismadb";

const denk = Denk_One({subsets:["latin"], weight:"400"})

import { Inter } from '@next/font/google'
import Link from "next/link"

const inter = Inter({ subsets: ['latin', "latin-ext"], weight:'900' })

export default async function Home() {

       
       const session = await getServerSession(authOptions)
       let userinfo = await prisma.contents.findFirst({where:{AND:[{type:"userinfo"}, {slug_tr:session?.user?.email}]} });
       let bigdata=userinfo?.bigdata ?? "{}";
       // console.log("bigdatabigdata: ", userinfo)
       bigdata=JSON.parse(bigdata);
       userinfo={...userinfo, bigdata}; //
       let loggedusertype=bigdata?.usertype;

       let name=bigdata?.name
       let usertype=bigdata?.usertype;
       let jobtype=bigdata?.jobtype;
       let code=bigdata?.code;

       
       let usertypeText="";

       switch (usertype) {
              case "tasnif":   usertypeText="Kullanıcı Tasnifi - (X)"                  
                     break;

              case "admin":   usertypeText="Tam Yetkili Yönetici"                  
                     break;          
                     
              case "yeniuye":   usertypeText="Yeni Üye"                  
                     break;                               

              case "admin-mimar":   usertypeText="Yönetici - Mimar"                  
                     break; 

              case "admin-muhendis":   usertypeText="Yönetici - Mühendis"                  
                     break;                                                                         
       
              default:
                     break;

       }
              
       // console.log("loggedusertypeloggedusertypeloggedusertype: ", bigdata);

       let jobtypeText="Belirtilmemiş";

       switch (jobtype) {
              case "engineer":   jobtypeText="Mühendis"                  
                     break;

              case "architect":   jobtypeText="Mimar"                  
                     break;          
                                                                                       
       
              default: jobtypeText="Belirtilmemiş"                  
                     break;
       }


  return (
    <div className={inter.className}>
      <Head>
              <title>SAKARYA İNŞAAT PROJE KOMİSYONU</title>
              <meta name="description" content="Generated by create next app" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.shell}>
 

      <div className={s.gridwr}>
                
              {session?.user?.email &&
                            <div className={s.userdatawr}> 
                                          <div>Ad / Soyad </div>
                                          <div style={{color: name ? "black" : "#b91010"}}>{name}</div>

                                          <div>Kullanıcı tipi </div>
                                          <div>{usertypeText}</div>

                                          <div>Meslek türü</div>
                                          <div style={{color: jobtypeText!=="Belirtilmemiş" ? "black" : "#b91010"}}>{jobtypeText}</div>

                                          <div>Sicil numarası</div>
                                          <div style={{color: code ? "black" : "#b91010"}}>{code}</div>

                                          <div></div>
                                          <div style={{color: "#00649b", border:"1px solid #00649b", padding:6, backgroundColor:"#52aaef", borderRadius:6, fontSize:12 }}><Link href={"/calc/profile"}>Güncelle</Link></div>                            
                            </div>
                }

                                                               {(session && usertype=="yeniuye") &&                                                           
                                                                      <div className={s.infowr}> 
                                                                                    YÖNETİCİ ONAYI BEKLEYİNİZ
                                                                      </div>
                                                            }

                { !session?.user?.email && <div style={{textAlign:"center", display:"flex", gap:11, flexDirection:"column", justifyContent:"center"}}> 
                
                     <div><img src={"/images/promidlanding.png"} width={150} height={178}/></div>

                            <h2> Proje Komisyonu Platformuna Hoş Geldiniz.</h2> 
                            <div>İşlemlere devam etmek için lütfen giriş yapınız. </div> 
                            <div>Giriş yapmak için Google Hesabınızı kullanabilirsiniz.</div> 
                            <a target={"_blank"} href="https://support.google.com/accounts/answer/176347?hl=tr&co=GENIE.Platform%3DDesktop"><div>Google hesabınızda başka bir e-posta adresi ile oturum açabilirsiniz.</div> </a>
                            
                            </div> }

                <div className={s.logowr}> <img src='/images/logolar_kucuk.png' style={{maxHeight:100}}/> </div>    
                                                   
                <div className={s.loginwr}>
                          
                          {(session && usertype!=="yeniuye" ) &&  <div className={s.loggeddata}>                                                          
                                                                      <div className={s.teklifwr}> 
                                                                          <a href={"/calc"}>PROJE HİZMET BEDELİ HESAPLAMA</a>
                                                                      </div>
                                                            </div>}
                          
                          {/* {session ? <SignOut/> : <SignIn/>} */}
                </div>


                  
                <div className={s.loginwr}>

                <h2>BİZE ULAŞIN</h2>

                <div> Mimarlar: <a href="mailto:mimar@promid.org.tr">mimar@promid.org.tr</a> </div>
                <div> İnşaat Mühendisleri: <a href="mailto:muhendis@promid.org.tr">muhendis@promid.org.tr</a> </div>




                          <div className={s.inputwr}>
                                 {/* <span>Ad/Soyad</span> */}
                                 {/* <input value={password} name="user" onChange={(e)=>setPassword(e?.target?.value)}/>  */}
                          </div>
                          <div className={s.inputwr}>
                                 {/* <span>İletişim bilgisi</span> */}
                                 {/* <input value={password} name="user" onChange={(e)=>setPassword(e?.target?.value)}/>  */}
                          </div>
                          <div className={s.inputwr}>
                                {/* <span>Mesaj</span> */}
                                {/* <textarea rows={4} value={user} name="user" onChange={(e)=>setUser(e?.target?.value)}/>  */}
                          </div>

                          {/* <button className={s.button} onClick={()=>router?.push("/calc")}>Gönder</button> */}
                </div>

                



      </div>



          


          
          <div className={s.rightwr}>


            
          </div>

          {/* <Link href={"/calc"} className={s.link} onMouseOver={()=>playAchieve()}>Login</Link> */}

          
                
      </div>
    </div>
  )
}
