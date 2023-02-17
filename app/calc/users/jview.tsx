
"use client"

import { JsonViewer, createDataType } from '@textea/json-viewer'

export const JVIEW = ({props}) => {

    let {bigdata} = props ?? {}  
    // userdata=JSON.parse(userdata)
    const Component = () => (<JsonViewer value={bigdata ?? {}}/>)

    return (
      <div>
                    <div>
                    <select value={"user"}>
                        <option value={"standart"}>Standart</option>
                        <option value={"datainput"}>Veri Girişi</option>
                        <option value={"user"}>Kullanıcı</option>
                        <option value={"rolmanager-arc"}>Rol yönetimi - Mimar</option>
                        <option value={"rolmanager-eng"}>Rol yönetimi - Mühendisi</option>
                        <option value={"admin"}>Yönetici</option>
                    </select>
                    </div>

        <Component />
      </div>
    );
  }
  
  