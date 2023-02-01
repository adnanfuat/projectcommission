
import { BsFolderSymlink } from "react-icons/bs";
import s from "./select.module.css"

export const SingleSelect = (props)  => {
    let { id, name, label, value, formik,  options, fullwidth, triggerFuncs, 
      
        selecttext // "Seçim yapınız" yazısı çıksın mı. Örneğin ülke için gerek yok buna. Her halükadar birşey seçilmelki ve zaten değer tanımlanmamışsa default değer var. Hiç selectext koyulmazsa ilk değer selecte set oluyor ama formike set olmuyor...Onu önlemek için yaptım ama daha farklı bir yöntem de güdülebilir..
      } = props
  

    

  return (
    <div className={s.shell} style={{width: fullwidth ? "100%" : "auto"}}>
          <div className={s.label}> {label} </div>  
          
          {/* <div> Hata mesajları </div> */} 
          <select className={s.select}  name={name} onChange={formik?.handleChange}>
            
            {selecttext && <option>Seçim yapınız</option>}
            
            
            {options?.map(option=>{

                return <option value={option?.value} selected={value==option.value} > {option?.label} </option>

            })}
          </select>
    </div>
  )
}




// <textarea rows={5} id={id} name={name} value={value} className={s.textarea} onChange={(e)=>{
                 
//                  formik.setFieldValue(name, e?.target?.value);
//                  triggerFuncs?.map(func=>{
//                        func({e})
//                  })

//           }} />