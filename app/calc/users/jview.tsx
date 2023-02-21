
"use client"

import { JsonViewer } from '@textea/json-viewer'
import { useState } from 'react'
import s from "./jview.module.css"


export const JVIEW = ({props}) => {

    let {email,bigdata, loggedusertype} = props ?? {}      
    const Component = () => (<JsonViewer  displayDataTypes={false} displayObjectSize={false} value={bigdata ?? {}}/>)
        
    const [relatedusertype, setrelatedusertype] = useState(bigdata?.usertype)
    
    const [submitting, setsubmitting] = useState(false);

    const [saved, setsaved] = useState(false)

    const saveFunc = async () => {
      
      
                              setsubmitting(true);

                              let datajson = await fetch("/api/changeusertype", 
                              { method: 'POST', headers: { 'Content-Type' : 'application/json'},
                              body: JSON.stringify({email, usertype:relatedusertype})
                            }).then(item=> { 
                              
                              setsubmitting(false);

                              setsaved(true);
                              setTimeout(() => {
                                setsaved(false);
                              }, 3000);
                            
                            })   
                                  //   let data =await datajson?.json()
                                  //   data= data?.userinfo;
                                  //   data={...data, bigdata:JSON.parse(data?.bigdata)}
                                  //   return data    
                                  // }
                            }
    

                            const [componentOpen, setcomponentOpen] = useState(false)

    return (
      <div className={s.shell}>
                    <div>
                                            <select value={relatedusertype} onChange={(e)=>setrelatedusertype(e?.target?.value)} className={s.select}>       

                                                        {(loggedusertype=="admin-muhendis" || loggedusertype=="admin-mimar" || loggedusertype=="admin") &&
                                                        <option value={"yeniuye"}>Yeni Üye</option>
                                                        }

                                                        {(loggedusertype=="admin-mimar" || loggedusertype=="admin-muhendis"  || loggedusertype=="admin" ) &&
                                                          <option value={"kullanici"}>Kullanıcı</option>
                                                        }
                                                        
                                                        {( loggedusertype=="admin") &&
                                                          <option value={"admin-mimar"}>Yönetici - Mimar</option>
                                                          }
                                                        {( loggedusertype=="admin") &&
                                                          <option value={"admin-muhendis"}>Yönetici - Mühendis</option>
                                                          }
                                                        {(loggedusertype=="admin") &&
                                                          <option value={"admin"}>Tam Yetkili Yönetici</option>
                                                        }
                                        </select>
                    </div>
                    
                    <button className={s.button} onClick={()=>{saveFunc()}} disabled={submitting}>Kaydet</button>
                    <div>{(saved) && "Kaydedildi"}</div>

        {componentOpen && <Component />}
      </div>
    );
  }
  
  