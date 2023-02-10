
"use client"
import { useFormik } from 'formik';
import { Inter } from '@next/font/google'
import s from './page.module.css';
import useSound from 'use-sound';
import {yapisinifiFunc} from "@/src/json/yapisinifi"
import { tasiyicisistemFunc} from "@/src/json/tasiyicisistem"
import {projeUcretOraniFunc} from "@/src/json/projeucretorani"



const inter = Inter({ subsets: ['latin', "latin-ext"] })

export default function Home() {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {      
      toplaminsaatalani:10,
      projetekrari:3,
      yapisinifi:`{"price":650,"code":"1A", "category":1}`,
       tasiyicisistem:`{"point":1,"code":"be"}`      
    },
    onSubmit: (values, {setSubmitting}) => {
      // console.log('valuessssss', values)
      // fetcher({values}).then(()=>{ 
      //   queryClient.invalidateQueries();
      //   setSubmitting(false)
      //  })
    },
  });   

 let {toplaminsaatalani,projetekrari ,yapisinifi,  tasiyicisistem} = formik?.values ?? {}

 //yapisinifi=yapisinifi ?  JSON.parse(yapisinifi) : yapisinifi; // Selectlerde valueleri stringfy edilmiş obje olarak tutuyoruz...

 let puo = projeUcretOraniFunc({m2:toplaminsaatalani, sinif:JSON.parse(yapisinifi)?.category});
 
 let yapisinifi_options=yapisinifiFunc()
 let  tasiyicisistem_options= tasiyicisistemFunc()
 // console.log("sasasa", yapisinifi, typeof(yapisinifi));
 //  tasiyicisistem

// let imho=0.75
// let bolge=0.7
let katsayi = 0.525



let sum = toplaminsaatalani*JSON.parse(yapisinifi)?.price*JSON.parse(tasiyicisistem)?.point*projeYenilemeKatsayisi({input:projetekrari})*katsayi*puo
    sum = parseFloat( sum.toFixed(2));

    const [play ] = useSound("/sounds/beep.mp3"); // hatanın çözümü    

//     console.log("asdasdsasdasad", JSON.parse(yapisinifi)?.category);

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
                                  <span>Taşıyıcı sistem</span>
                                  <select name='tasiyicisistem'  value={tasiyicisistem} onChange={formik.handleChange}>
                                      
                                      {
                                           tasiyicisistem_options?.map(item=>{
                                                      return <option value={JSON.stringify(item?.value)}>{`${item?.label} - ${item?.value?.point}`}</option>                                      
                                          })
                                      }

                                  </select>
                            </div>           


                                                              
                            
                  </div>



            <div className={s.resultwr}>
                                      
                        
                              <div className={s.mainresult} onMouseOver={()=>play()}>                                            
                                    <h1>PROJE ÜCRETİ: </h1>
                                    <h1>{sum} TL</h1>
                              </div>
                        
                              PUO: {puo}

                              <div className={s.resulttable}>

                                                      

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
                                                            <h2> {JSON.parse(tasiyicisistem)?.point} </h2>
                                                      </div>     

                                                      

                                                      <div className={s.block} onMouseOver={()=>play()}>                                            
                                                            <h3>P. yenileme katsayısı</h3>
                                                            <h2>{ projeYenilemeKatsayisi({input:projetekrari}) }</h2>
                                                      </div>                                                                        

                                                      

                                                      



                              </div>
            </div>


                <div className={s.announcementswr}>                                                                  
                                            
                                          <div className={s.agtitle}>DUYURULAR</div>

                        <div className={s.announcements}>                                                                                          
                                          {[0,1].map(item=><div className={s.announcement}>                                                                          
                                                      <div className={s.atitle}>Yeni yönetmelik yayınlandı....</div>
                                                      <div className={s.acontent}>Burada yer alan içerik sadece siz ziyaretçilerimize mesleğimizle ilgili tüm kanunlara toplu olarak erişim sağlamak amacıyla derlenmiştir. Kanunlar bölümü güncel tutulmaya çalışılmaktadır. Ancak hukuki sorunların önemini dikkate alarak lütfen ayrıntılı ve güncel kanunlar için mevzuat.basbakanlik.gov.tr, www.yargitay.gov.tr veya www.danistay.gov.tr adreslerini ziyaret ediniz.</div>
                                          </div>    )                    }
                        </div>
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