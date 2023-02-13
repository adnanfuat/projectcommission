
"use client"
import ReactToPrint from 'react-to-print';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Inter } from '@next/font/google'
import s from './page.module.css';
import useSound from 'use-sound';
import {yapisinifiFunc} from "@/src/json/yapisinifi"
import { tasiyicisistemFunc} from "@/src/json/tasiyicisistem"
import {projeUcretOraniFunc} from "@/src/json/projeucretorani"



const inter = Inter({ subsets: ['latin', "latin-ext"] })

export default function Home() {

      const componentRef = useRef();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {      
      toplaminsaatalani:1000,
      projetekrari:1,
      yapisinifi:`{"price":650,"code":"1A", "category":1}`,
       tasiyicisistem:`{"point":1, "title":"Betonarme"}`,
       yapisahibi:"",       
       ilce:"",
       mahalle:"",
       ada:"", 
       parsel:""      

    },
    onSubmit: (values, {setSubmitting}) => {
      // console.log('valuessssss', values)
      // fetcher({values}).then(()=>{ 
      //   queryClient.invalidateQueries();
      //   setSubmitting(false)
      //  })
    },
  });   

 let {toplaminsaatalani,projetekrari ,yapisinifi, tasiyicisistem, yapisahibi, ilce, mahalle, ada, parsel} = formik?.values ?? {}

 //yapisinifi=yapisinifi ?  JSON.parse(yapisinifi) : yapisinifi; // Selectlerde valueleri stringfy edilmiş obje olarak tutuyoruz...

 let puo = projeUcretOraniFunc({m2:toplaminsaatalani, sinif:JSON.parse(yapisinifi)?.category});
 
 let yapisinifi_options=yapisinifiFunc()
 let  tasiyicisistem_options= tasiyicisistemFunc()

 //  tasiyicisistem

// let imho=0.75
// let bolge=0.7
let katsayi = 0.525



let sum = toplaminsaatalani*JSON.parse(yapisinifi)?.price*JSON.parse(tasiyicisistem)?.point*projeYenilemeKatsayisi({input:projetekrari})*katsayi*puo
    sum = parseFloat(Math.round(sum)?.toFixed(4));

    sum = sum<50000 ? 50000 : sum

    let sum_locale=sum?.toLocaleString("tr-TR")
    let sum_kdv_locale=(Math.round(1.18*sum))?.toLocaleString("tr-TR");

    let sum_kdv_locale_25=(Math.round(1.18*sum)*25/100)?.toLocaleString("tr-TR");
    let sum_kdv_locale_75=(Math.round(1.18*sum)*75/100)?.toLocaleString("tr-TR");

    const [play] = useSound("/sounds/beep.mp3"); // hatanın çözümü    

//     console.log("asdasdsasdasad", JSON.parse(yapisinifi)?.category);

  return (    
            <form  onSubmit={formik.handleSubmit}  className={`${s.form} ${inter.className}`}> 

                  <div className={s.inputsections}>
                                          
                              <div className={s.section}>              
                                    <span>Toplam inşaat alanı</span>
                                    <input name='toplaminsaatalani' type="number" value={toplaminsaatalani} onChange={formik.handleChange} />
                              </div>    
                              <div className={s.section}>              
                                    <span>Proje tekrarı</span>
                                    <input name='projetekrari' type="number" value={projetekrari} onChange={formik.handleChange}/>
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
                                  <span>Taşıyıcı sistem</span>
                                  <select name='tasiyicisistem'  value={tasiyicisistem} onChange={formik.handleChange}>
                                      
                                      {
                                           tasiyicisistem_options?.map(item=>{
                                                      return <option value={JSON.stringify(item?.value)}>{`${item?.label} - ${item?.value?.point}`}</option>                                      
                                          })
                                      }

                                  </select>
                            </div>          


                              <div className={s.section} onMouseOver={()=>play()}>                                            
                                    <h2>PROJE ÜCRETİ: </h2>
                                    <h3>{sum_locale} TL + KDV = {sum_kdv_locale}TL</h3>                                    
                                    <div>Minimum Oran (%25): {sum_kdv_locale_25}   TL</div>
                                    <div>Max Oran (%75): {sum_kdv_locale_75} TL</div>
                              </div> 


                                                              
                            
                  </div>



            <div className={s.inputsections2}>

                             

                                                      
                                                            
                                                            
                                                            <div className={s.section}>              
                                                                        <span>Yapı sahibi</span>
                                                                        <input name='yapisahibi'  value={yapisahibi} onChange={formik.handleChange}/>
                                                            </div>

                                                            <div className={s.section}>              
                                                                        <span>İlçe</span>
                                                                        <input name='ilce'  value={ilce} onChange={formik.handleChange}/>
                                                            </div>

                                                            <div className={s.section}>              
                                                                        <span>Mahalle</span>
                                                                        <input name='mahalle'  value={mahalle} onChange={formik.handleChange}/>
                                                            </div>                                                                                                                        

                                                            <div className={s.section}>              
                                                                        <span>Ada</span>
                                                                        <input name='ada'  value={ada} onChange={formik.handleChange}/>
                                                            </div>

                                                            <div className={s.section}>              
                                                                        <span>Parsel</span>
                                                                        <input name='parsel'  value={parsel} onChange={formik.handleChange}/>
                                                            </div>
                                                                                                                                                                                                                                     

                                                      

                  
            </div>

            {console.log("sasasasasasa", tasiyicisistem?.title)}
            
            <div className={s.teklifmainwr} >

                <div className={s.teklifwr}  ref={componentRef}>                                                                  
                                            
                        <div className={s.tekliftitle}>TEKLİF</div>

                        <div className={s.teklifgrid}>                         
                        

                                    <div className={s.yapisahibi}> <span> Yapı sahibi </span> {yapisahibi} </div>                    
                                    
                                    <div className={s.ilce}> <span> İlçe </span> {ilce}  </div>                    

                                    <div className={s.mahalle}> <span> Mahalle </span>{mahalle}    </div>                    
                                    <div className={s.ada}>   <span> Ada </span>{ada}  </div>                    
                                    <div className={s.parsel}> <span> Parsel </span>{parsel}    </div>                    

                                    <div className={s.toplaminsaatalani}>  <span> Toplam inşaat alanı </span>{toplaminsaatalani}    </div>                    
                                    <div className={s.projetekrari}> <span> Proje tekrar </span>  {projetekrari}  </div>                    
                                    <div className={s.yapisinifi}>  <span> Yapı sınıfı </span> {JSON.parse(yapisinifi)?.code}   </div>                        
                                    <div className={s.tasiyicisistem}> <span> Taşıyıcı sistem </span>{JSON.parse(tasiyicisistem)?.title}    </div>                    
                                    <div className={s.projeucreti}> <span> Proje ücreti </span>                     
                                                      <h2>{sum_locale} TL +  KDV</h2>                                                      
                                    </div>                    

                                    <div className={s.toplamucret}> <span> Toplam ücret </span>                                    
                                                      
                                                      <h2>{sum_kdv_locale} TL </h2>
                                    </div>                                                        
                                                                                                                                    
                        </div>

                  </div>                                                                  
            
                  <ReactToPrint trigger={() => <button style={{backgroundColor:"#007eff", color:"black", padding:10,display:"flex", width:"80%", justifyContent:"center", margin:10}}>YAZDIR</button>} content={() => componentRef.current} />                                                

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






// <div className={s.announcementswr}>                                                                  
                                            
// <div className={s.agtitle}>DUYURULAR</div>

// <div className={s.announcements}>                                                                                          
//                   {[0,1].map(item=><div className={s.announcement}>                                                                          
//                               <div className={s.atitle}>Yeni yönetmelik yayınlandı....</div>
//                               <div className={s.acontent}>Burada yer alan içerik sadece siz ziyaretçilerimize mesleğimizle ilgili tüm kanunlara toplu olarak erişim sağlamak amacıyla derlenmiştir. Kanunlar bölümü güncel tutulmaya çalışılmaktadır. Ancak hukuki sorunların önemini dikkate alarak lütfen ayrıntılı ve güncel kanunlar için mevzuat.basbakanlik.gov.tr, www.yargitay.gov.tr veya www.danistay.gov.tr adreslerini ziyaret ediniz.</div>
//                   </div>    )                    }
// </div>

// </div>



// <div className={s.section}>              
//                                   <span>Hizmetler</span>
//                                   <select name='hizmetler'  value={hizmetler} onChange={formik.handleChange}>
//                                       <option value={1}>Proje hizmeti</option>
//                                       <option value={0.1}>Öneri raporu</option>
//                                       <option value={0.15}>Ön proje</option>
//                                       <option value={0.15}>Metraj</option>
//                                       <option value={0.6}>Fenni mesuliyet</option>
//                                       <option value={0.6}>Statik uygulama projesi ve detaylari</option>                          
//                                   </select>
//                             </div>      