
"use client"
import { useFormik } from 'formik';
import { Inter } from '@next/font/google'
import s from './page.module.css';
import useSound from 'use-sound';
import {yapisinifiFunc} from "@/src/json/yapisinifi"
import {yapisinifikatsayiFunc} from "@/src/json/yapisinifikatsayi"



const inter = Inter({ subsets: ['latin', "latin-ext"] })

export default function Home() {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {      
      toplaminsaatalani:10,
      projetekrari:3,
      yapisinifi:`{"price":990,"code":"1B"}`,
      yapisinifikatsayi:`{"point":2,"code":"be"}`,
      tasiyicisistem:undefined,
      hizmetler:0.6,
    },
    onSubmit: (values, {setSubmitting}) => {
      // console.log('valuessssss', values)
      // fetcher({values}).then(()=>{ 
      //   queryClient.invalidateQueries();
      //   setSubmitting(false)
      //  })
    },
  });   

 let {toplaminsaatalani,projetekrari ,yapisinifi, yapisinifikatsayi, tasiyicisistem, hizmetler} = formik?.values ?? {}

 //yapisinifi=yapisinifi ?  JSON.parse(yapisinifi) : yapisinifi; // Selectlerde valueleri stringfy edilmiş obje olarak tutuyoruz...

 
 let yapisinifi_options=yapisinifiFunc()
 let yapisinifikatsayi_options=yapisinifikatsayiFunc()
 // console.log("sasasa", yapisinifi, typeof(yapisinifi));
 // yapisinifikatsayi

let imho=0.75
let bolge=0.7


let sum = toplaminsaatalani*JSON.parse(yapisinifi)?.price*sonYSKPuani({input:JSON.parse(yapisinifikatsayi)?.point})*imho*projeYenilemeKatsayisi({input:projetekrari})*hizmetler*bolge
    sum = parseFloat( sum.toFixed(2));

    const [play ] = useSound("/sounds/beep.mp3"); // hatanın çözümü    

  return (    
            <form  onSubmit={formik.handleSubmit}  className={`${s.form} ${inter.className}`}>

                  <div className={s.inputsections}>

                        <div className={s.sectionwr}>
                                                      <div className={s.section}>              
                                                            <span>Toplam inşaat alanı</span>
                                                            <input name='toplaminsaatalani' type="number" value={toplaminsaatalani} onChange={formik.handleChange}  style={{width:160}}/>
                                                      </div>    
                                                      <div className={s.section}>              
                                                            <span>Proje tekrarı</span>
                                                            <input name='projetekrari' type="number" value={projetekrari} onChange={formik.handleChange} style={{width:160}}/>
                                                      </div>
                        </div>

                            <div className={s.section}>              
                                  <span>Yapı sınıfı</span>
                                  <select name='yapisinifi'  value={yapisinifi} onChange={formik.handleChange}>
                                      
                                      {
                                          yapisinifi_options?.map(item=>{
                                                      return <option value={JSON.stringify(item?.value)}>{item?.label} - {item?.value?.price} TL/m2 </option>                                      
                                          })
                                      }

                                  </select>
                            </div>        

                            <div className={s.section}>              
                                  <span>Yapı sınıfı katsayı puanları</span>
                                  <select name='yapisinifikatsayi'  value={yapisinifikatsayi} onChange={formik.handleChange}>
                                      
                                      {
                                          yapisinifikatsayi_options?.map(item=>{
                                                      return <option value={JSON.stringify(item?.value)}>{item?.label}</option>                                      
                                          })
                                      }

                                  </select>
                            </div>           


                            <div className={s.section}>              
                                  <span>Hizmetler</span>
                                  <select name='hizmetler'  value={hizmetler} onChange={formik.handleChange}>
                                      <option value={0.1}>Proje hizmeti</option>
                                      <option value={0.6}>B. proje + Fenni mesuliyet</option>                          
                                  </select>
                            </div>                                        
                            
                  </div>

                <div className={s.resulttable}>
                                    <div className={s.block} onMouseOver={()=>play()}>                                            
                                            <h3>Proje ücreti</h3>
                                            <h2>{sum}</h2>
                                    </div>

                                    <div className={s.block} onMouseOver={()=>play()}>                                            
                                            <h3>Yapı alanı</h3>
                                            <h2>{toplaminsaatalani}</h2>
                                    </div>

                                    <div className={s.block} onMouseOver={()=>play()}>                                            
                                            <h3>Birim maliyet</h3>
                                            {/* <div>{ yapisinifi ? JSON.parse(yapisinifi)?.price : 0   }</div> */}
                                            <h2>{ JSON.parse(yapisinifi)?.price }</h2>
                                    </div>

                                    <div className={s.block}>                                            
                                            <h3>Y. S. katsayı puanı</h3>
                                            <h2>{ sonYSKPuani({input:JSON.parse(yapisinifikatsayi)?.point}) }</h2>
                                    </div>     

                                    <div className={s.block} onMouseOver={()=>play()}>                                            
                                            <h3>İ.M. hizmet oranı</h3>
                                            <h2>{ imho }</h2>
                                    </div>  

                                    <div className={s.block} onMouseOver={()=>play()}>                                            
                                            <h3>P. yenileme katsayısı</h3>
                                            <h2>{ projeYenilemeKatsayisi({input:projetekrari}) }</h2>
                                    </div>                                                                        

                                    <div className={s.block} onMouseOver={()=>play()}>                                            
                                            <h3>Hizmet bölümleri</h3>
                                            <h2>{ hizmetler }</h2>
                                    </div>          

                                    <div className={s.block} onMouseOver={()=>play()}>                                            
                                            <h3>Bölge katsayısı</h3>
                                            <h2>{ bolge }</h2>
                                    </div>                                                                                                                                        



                </div>


                <div className={s.resulttable}>
                  ...
                 </div>
            </form>
          )
}






const projeYenilemeKatsayisi = ({input}) => {
  
      let result=0;

      if (input==1) {  result=1 }
      else if (input==2) {  result=1.5 }
      else if (input==3) {  result=1.75 }
      else if (input==4) {  result=1.9 }
      else if (input>4) {  
                                    let difference=input-4;                                    
                                    result=1.9+difference*0.15;
                         }


            result=parseFloat(result.toFixed(2))

      return ( result )

}



const sonYSKPuani = ({input}) => {
      
      
      
      let result=0;

      if (input<4) {            
            // console.log("inputinputinputinput: ", result, input); 
            result=1;
      }
      else if (input==4) {            
            // console.log("inputinputinputinput: ", result, input); 
            result=1.1;
      }      
      else if (input==5) {            
            // console.log("inputinputinputinput: ", result, input); 
            result=1.2;
      }            
      else if (input==6 || input==7) {                        
            result=1.3;
      }                  
      else if (input==8) {                        
            result=1.4;
      }                        

      // switch (input) {
      //       case input<4: result=1;             
      //             break;
      //       case input==4: result=1.1;             
      //             break;                  
      
      //       default:result=0;
      //             break;
      // }

      
      return ( result )
      
}
