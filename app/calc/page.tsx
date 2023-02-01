
"use client"
import { useFormik } from 'formik';
import { Inter } from '@next/font/google'
import s from './page.module.css'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {      
      toplaminsaatalani:10,
      projetekrari:3,
      yapisinifi:undefined,
      tasiyicisistem:undefined,
      hizmetler:undefined,
    },
    onSubmit: (values, {setSubmitting}) => {
      // console.log('valuessssss', values)
      // fetcher({values}).then(()=>{ 
      //   queryClient.invalidateQueries();
      //   setSubmitting(false)
      //  })
    },
  });   

 let {toplaminsaatalani,projetekrari ,yapisinifi, tasiyicisistem, hizmetler} = formik?.values ?? {}


  return (    
            <form  onSubmit={formik.handleSubmit}  className={s.form}>

                  <div className={s.inputsections}>

                            <div className={s.section}>              
                                  <div>Toplam inşaat alanı</div>
                                  <input name='toplaminsaatalani' type="number" value={toplaminsaatalani} onChange={formik.handleChange}  style={{width:160}}/>
                            </div>    
                            <div className={s.section}>              
                                  <div>Proje tekrarı</div>
                                  <input name='projetekrari' type="number" value={projetekrari} onChange={formik.handleChange} style={{width:160}}/>
                            </div>    
                            <div className={s.section}>              
                                  <div>Yapı sınıfı</div>
                                  <select name='yapisinifi'  value={yapisinifi} onChange={formik.handleChange}>
                                      <option value={"1A"}>1A</option>
                                      <option value={"1B"}>1B</option>
                                      <option value={"2A"}>2A</option>
                                      <option value={"2B"}>2B</option>
                                  </select>
                            </div>        

                            <div className={s.section}>              
                                  <div>Taşıyıcı sistem</div>
                                  <select name='tasiyicisistem'  value={tasiyicisistem} onChange={formik.handleChange}>
                                      <option value={"kargir"}>Kargir/Yığma</option>
                                      <option value={"betonarme"}>Betonarme</option>                          
                                  </select>
                            </div>           


                            <div className={s.section}>              
                                  <div>Hizmetler</div>
                                  <select name='hizmetler'  value={hizmetler} onChange={formik.handleChange}>
                                      <option value={"projehizmeti"}>Proje hizmeti</option>
                                      <option value={"bproje"}>B. proje + Fenni mesuliyet</option>                          
                                  </select>
                            </div>                                        
                            
                  </div>

                <div className={s.resulttable}>
                                    <div>
                                            <div>PÜ</div>
                                            <div>Proje ücreti</div>
                                            <div>101068</div>
                                    </div>

                                    <div>
                                            <div>PÜ</div>
                                            <div>Proje ücreti</div>
                                            <div>101068</div>
                                    </div>

                                    <div>
                                            <div>PÜ</div>
                                            <div>Proje ücreti</div>
                                            <div>101068</div>
                                    </div>

                                    <div>
                                            <div>PÜ</div>
                                            <div>Proje ücreti</div>
                                            <div>101068</div>
                                    </div>                                    



                </div>

            </form>
          )
}
