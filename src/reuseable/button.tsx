import s from "./button.module.css"
// import {iconArchive, iconArchivePropType } from "@/components/utilsnew/iconarchive";


export interface Props {
  props: {
    text:String
    title:string
    onClick: () => void;    
    disabled?: boolean
    width?:Number
    height?:Number    
    loading?: boolean
    style?:any
    label:string
  }
}

// V2'de style gibi alanları dışarıdan ayarlamak için geliştirme yapıldı. Yani kısaca artık ieride işlem yok. Dışarısı yönetiyor.
export const ButtonV2 = ({props}:Props ) => {
  
  let {onClick, text, title, icon, disabled, style, loading, label} = props ?? {}

  style = style ?  style : {width:40, height:40}

  style= style?.borderWidth ? style : {...style, borderWidth:2} // borderwidth atanmışsa borderWidthi yoksa, default özellikleri al
  style= style?.borderStyle ? style : {...style, borderStyle:"solid"} 
  style= style?.borderColor ? style : {...style, borderColor:"black"} 

  // console.log("otherprops::::", style);
  
  return (
    <div className={s.shell}>                

        <div className={s.label}> {label} </div> 

        <button type="button" onClick={onClick} 
              disabled={disabled} 
              title={title}  
              text={text}  
              className={s.button} 
              // style={{'--w':width ? `${width}px` : `${40}px`,  '--h':height ? `${height}px` : `${40}px`}} 
              style={style}
              >  
              
              {/* {iconArchive({ icon: loading ? "IoSwapVertical" : icon  }) } */}
               {text} 

              

        </button>
    </div>
  )
}


