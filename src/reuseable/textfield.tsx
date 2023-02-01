

import s from "./textfield.module.css"

export const Textfield = (props) => {
      let {       
              id, 
              name, 
              label, 
              value, 
              formik, 
              triggers, 
              forceNumber,
              fullwidth,
              disabled=false
          } = props ?? {}

    // console.log("value::::::", forceNumber)
  return (
    <div className={s.shell} style={{width: fullwidth ? "100%" : "auto"}}>
          <div className={s.label}> {label} </div> 
          
          <div>
            {/* {eval(`formik?.values?.${name}`) }  */}

            <input type={"text"}  id={id} name={name} value={value ?? ""} className={s.textfield} disabled={disabled}
                                        
                 onChange={(e)=>{
                                    //  console.log("asdsadsadsa", name, eval(`formik?.values?.${name}`), formik, e?.target?.value)

                                    let input= forceNumber ? Number(e?.target?.value ?? 0) : e?.target?.value;  // Numara olması gereken bir alansa numara dönüştürüyoruz.
                                    formik?.setFieldValue(name, input);                                     
                                    // console.log("triggerrrr front", triggers)
                                    triggers?.map(trigger=>{
                                      trigger(e);
                                      // console.log("triggerrrr", trigger)
                                    });   // Yandan yollanan ek fonksyionlar varsa onları da çalıştırıyor. Örneğin, masterfieldların paralel şekilde set edilmesi için...


                                }} 
          
             />
          

          </div>                


          {/* <div> Hata mesajları </div> */}
    </div>
  )
}
