
export const data=
[
  {
    "title": "Taşıyıcı sistem yapısı veya analiz yöntemine göre",
    "sub": [
      {
        "title": "Kagir / Yığma",
        "code":"ky",
        "point": 1
      },
      {
        "title": "Betonarme",
        "code":"be",
        "point": 2
      },
      {
        "title": "Betonarme ön üretimli yapılar",
        "code":"boe",
        "point": 2
      },
      {
        "title": "Ahşap",
        "code":"ah",
        "point": 3
      },
      {
        "title": "Çelik karkas / Hafif çelik",
        "code":"ceka",
        "point": 3
      }     

    ]
  },
  {
    "title": "Temel sistemine göre",
    "sub": [
      {
        "title": "Yüzeysel",
        "code":"yu",
        "point": 1
      },
      {
        "title": "Derin",
        "code":"de",
        "point": 1
      }      
    ]
  }  
]

  export const yapisinifikatsayiFunc = () => {

                let options:Array<object>=[];
                    data[0]?.sub?.map(x=>{ // Sadece birinci nodu tarıyoruz.. İkincisi aşağıda +1 olarak manul şekilde ekleyeceğiz...
                        //console.log("item:::..", item)
                        
                                                options= [...options,  {value:{point:(x?.point+1), code:x?.code}, label:`${x?.title} [${x?.point}+1=${x?.point+1}]`}]  //1= data[1]?.sub[0]?.point -> her zaman yüzeyselin değeri olan "1'i" şlave edeceğiz
                                          
                                    })

                    return options

  }