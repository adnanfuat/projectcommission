
// import { BsFolderSymlink } from "react-icons/bs";
import s from "./textarea.module.css"

export const Textarea = (props)  => {
    let { id, name, label, value, formik, fullwidth, triggerFuncs, disabled=false } = props
    // console.log("formik:::", formik)
  return (
    <div className={s.shell} style={{width: fullwidth ? "100%" : "auto"}}>
          <div className={s.label}> {label} </div> 
          {/* <div>asdsadsaddsa {Math.round(value?.length/50) ?? 5}</div> */}
          <div><textarea rows={`${Math.round(value?.length/80)}` ?? "5"} id={id} name={name} value={value} className={s.textarea} disabled={disabled}  onChange={(e)=>{
                 
                        formik.setFieldValue(name, e?.target?.value);
                        triggerFuncs?.map(func=>{
                              func({e})
                        })

                 }} /></div>                
          {/* <div> Hata mesajları </div> */}
    </div>
  )
}
