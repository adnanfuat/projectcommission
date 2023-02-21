"use client"
import s from "./page.module.css";
import { useFormik } from 'formik';
import { useQuery } from "react-query";


export default  function Profile  () {
  

const fetcher_userdata = async() => {
    
  let datajson=await fetch("/api/fetchuserdata", { method: 'POST', headers: { 'Content-Type' : 'application/json'}, })   
    let data =await datajson?.json()
    data= data?.userinfo;
    data={...data, bigdata:JSON.parse(data?.bigdata)}
    return data    
}

  const { isLoading, isError, isSuccess, error, data } = useQuery( ["userdata"], () => fetcher_userdata() );    
  //  console.log("mimmmmmmmmmmmmmmmm", data);mimmmmmmmmmmmmmmmm


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data?.bigdata,
    onSubmit: (values, {setSubmitting}) => {      
        setSubmitting(true);
                fetch("/api/updateuser", {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values)
                }).then(item=>{
                  setSubmitting(false);
                })                              
    },
  });   


  let {jobtype, name, code } = formik?.values ?? {}



  // console.log("asdsadsaasdasd", formik?.values)

  if (!data) {
    return <div style={{color:"white", padding:50, backgroundColor:"black"}}>Yetkiniz olmayan alandasınız</div>
  }

  return (
    <form    className={`${s.form}`}> 
          
                  <div className={s.shell}>
                    <div className={s.row}>
                      <span>Meslek</span>
                      <select value={jobtype} name="jobtype" onChange={formik?.handleChange}>
                        <option value={""}>Seçiniz</option>"{" "}
                        <option value={"architect"}>Mimar</option>
                        <option value={"engineer"}>İnşaat Mühendisi</option>
                      </select>
                    </div>

                    <div className={s.row}>
                      <span>Oda Sicil Numarası</span>
                      <input value={code} name="code"  onChange={formik?.handleChange}/>
                    </div>

                    <div className={s.row}>
                      <span>Ad / Soyad</span>
                      <input value={name} name="name"  onChange={formik?.handleChange}/>
                    </div>
                  </div>

                  <button type="button" disabled={formik?.isSubmitting} onClick={()=>formik?.handleSubmit()} className={s.button}>Kaydet</button>
          
    </form>
  );
}



