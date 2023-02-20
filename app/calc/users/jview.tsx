
"use client"

import { JsonViewer, createDataType } from '@textea/json-viewer'
import { useState } from 'react'
import s from "./jview.module.css"


export const JVIEW = ({props}) => {

    let {email,bigdata, loggedusertype} = props ?? {}      
    const Component = () => (<JsonViewer  displayDataTypes={false} displayObjectSize={false} value={bigdata ?? {}}/>)
        
    const [relatedusertype, setrelatedusertype] = useState(bigdata?.usertype)
        
    const saveFunc = async () => {
                              let datajson = await fetch("/api/changeusertype", 
                              { method: 'POST', headers: { 'Content-Type' : 'application/json'},
                              body: JSON.stringify({email, usertype:relatedusertype})
                            })   
                                  //   let data =await datajson?.json()
                                  //   data= data?.userinfo;
                                  //   data={...data, bigdata:JSON.parse(data?.bigdata)}
                                  //   return data    
                                  // }
                            }
    

    return (
      <div> -Usertype:{bigdata?.usertype}
---
loggedusertype: {loggedusertype}
                    <div>
                                            <select value={relatedusertype} onChange={(e)=>setrelatedusertype(e?.target?.value)}>                              
                                                        {(loggedusertype=="tasnif" || loggedusertype=="admin") &&
                                                        <option value={"standart"}>Standart</option>
                                                        }

                                                        {/* {(loggedusertype=="admin") &&
                                                          <option value={"verigirisi"}>Veri Girişi</option>
                                                        } */}

                                                        {(loggedusertype=="admin-mimar" || loggedusertype=="admin-muhendis"  || loggedusertype=="admin" ) &&
                                                          <option value={"kullanici"}>Kullanıcı</option>
                                                        }
                                                        {(loggedusertype=="admin") &&
                                                          <option value={"tasnif"}>Kullanıcı tasnifi</option>
                                                          }
                                                        {( loggedusertype=="admin") &&
                                                          <option value={"admin-mimar"}>Yönetici - Mimar</option>
                                                          }
                                                        {( loggedusertype=="admin") &&
                                                          <option value={"admin-muhendis"}>Yönetici- Mühendis</option>
                                                          }
                                                        {(loggedusertype=="admin") &&
                                                          <option value={"admin"}>Yönetici</option>
                                                        }
                                        </select>
                    </div>
                    
                    <button className={s.button} onClick={()=>{saveFunc()}}>Kaydet</button>

        <Component />
      </div>
    );
  }
  
  