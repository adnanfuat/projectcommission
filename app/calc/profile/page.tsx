"use client"
import s from "./page.module.css";
import { useFormik } from 'formik';





export default  function Profile  () {
  


  const sendData = async ()  => {
    // let userinfo = await prisma.contents.findFirst({where:{slug_tr:"yigitruzgaruzun@gmail.com"}})
    // console.log("tamam bu iş ", userinfo)
    fetch("/api/updateuser");
          
  }



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {      
      jobtype:"assasaasformik",
      name:"asdsasaddsa",
      code:12121212121277
    },
    onSubmit: (values, {setSubmitting}) => {
      
    },
  });   


  let {jobtype, name, code } = formik?.values ?? {}



  console.log("asdsadsaasdasd", formik?.values)

  return (
    <form  onSubmit={formik.handleSubmit}  className={`${s.form}`}> 
          <div>
                  <div className={s.shell}>
                    <div>
                      <span>Meslek</span>
                      <select value={jobtype} name="jobtype" onChange={formik?.handleChange}>
                        " <option value={""}>Seçiniz</option>"{" "}
                        <option value={"architect"}>Mimar</option>
                        <option value={"engineer"}>İnşaat Mühendisi</option>
                      </select>
                    </div>

                    <div>
                      <span>Oda Sicil Numarası</span>
                      <input value={code} name="code"  onChange={formik?.handleChange}/>
                    </div>

                    <div>
                      <span>Ad / Soyad</span>
                      <input value={name} name="name"  onChange={formik?.handleChange}/>
                    </div>
                  </div>

                  <button type="button" onClick={()=>sendData()}>sadsdadsa</button>
          </div>
    </form>
  );
}



