
"use client"
import { RiDeleteBin2Fill } from "react-icons/ri";
import { JsonViewer } from '@textea/json-viewer'
import { useState } from 'react'
import s from "./jview.module.css"


export const JVIEW = ({props}) => {

    let {email,bigdata, loggedusertype} = props ?? {}      
    
    const Component = () => (<JsonViewer  displayDataTypes={false} displayObjectSize={false} value={bigdata ?? {}}/>)
        
    const [relatedusertype, setrelatedusertype] = useState(bigdata?.usertype)
    
    const [submitting, setsubmitting] = useState(false);

    const [saved, setsaved] = useState(false)
    const [deleted, setdeleted] = useState(false)

    const saveFunc = async () => {          
                                    setsubmitting(true);

                                    let datajson = await fetch("/api/changeusertype", 
                                    { method: 'POST', headers: { 'Content-Type' : 'application/json'},
                                    body: JSON.stringify({email, usertype:relatedusertype})
                                  }).then(item=> {                                     
                                    setsubmitting(false);
                                    setsaved(true);
                                    setTimeout(() => { setsaved(false); }, 3000);                                  
                                  })                                     
                            }


const deleteFunc = async () => {          
                              

                              let datajson = await fetch("/api/deleteuser", 
                              { method: 'POST', headers: { 'Content-Type' : 'application/json'},
                              body: JSON.stringify({email})
                            }).then(item=> {                                                                   
                              setdeleted(true);                                               
                            })                                     
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
                                                        
                                                        {( loggedusertype=="admin" || loggedusertype=="admin-mimar") &&
                                                          <option value={"admin-mimar"}>Yönetici - Mimar</option>
                                                          }
                                                        {( loggedusertype=="admin" || loggedusertype=="admin-muhendis") &&
                                                          <option value={"admin-muhendis"}>Yönetici - Mühendis</option>
                                                          }
                                                        {(loggedusertype=="admin"  || loggedusertype=="admin-mimar"  || loggedusertype=="admin-muhendis" ) &&
                                                          <option value={"admin"}>Tam Yetkili Yönetici</option>
                                                        }
                                        </select>
                    </div>
                    
                    {!deleted && <button className={s.button} onClick={()=>{saveFunc()}} disabled={submitting || (relatedusertype=="admin" && loggedusertype!="admin")}>Kaydet</button>}
                    {(loggedusertype=="admin" && !deleted) &&<div onClick={()=>deleteFunc()}><RiDeleteBin2Fill size={26} color="#d50707"/></div>}
                    <div>{(saved) && "Kaydedildi"}</div>
                    

        {componentOpen && <Component />}
      </div>
    );
  }
  
  