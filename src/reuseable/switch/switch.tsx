import { Textarea, Richarea,  Button} from "@/components/reuseable";
import s from "./switch.module.css"

import { iconArchive} from  "@/components/utilsnew/iconarchive";

interface Proptype {
      props: {
            id?: Number;
            label?: String;
            // name: String;            
            type: String;            
            formik: any;
            checked:Boolean,
            set_checked: Function
      };
}

export const Switch = ({props}:Proptype)  => {
    let { id,  label, checked, set_checked, type,  formik } = props;
           
    // console.log("formik::sadsasa:", props, checked)
  return (
    <div  onClick={()=>{set_checked(()=>!checked) }} >    
            <button className={s.switch} type="button" >{iconArchive({checked, type: (type ?? "RiToggle" )})} {label} </button>            
            <Button props={{onClick:buttonClick, title:"Ekle", width:120, icon:"IoAddOutline"}}/>
    </div>
  )
}
