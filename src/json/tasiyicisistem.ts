


export const data=
[
  {
    "title": "Taşıyıcı sistem yapısı veya analiz yöntemine göre",
    "sub": [      
      {
        "title": "Betonarme",
        "code":"be",
        "point": 1
      },
      {
        "title": "Çelik veya Ahşap",
        "code":"ceka",
        "point": 1.1
      }     
    ]
  },  
]

  export const  tasiyicisistemFunc = () => {

                let options:Array<object>=[];
                    data[0]?.sub?.map(x=>{ // Sadece birinci nodu tarıyoruz.. İkincisi aşağıda +1 olarak manul şekilde ekleyeceğiz...
                        //console.log("item:::..", item)
                        
                                                options= [...options,  {value:{point:(x?.point), code:x?.code}, label:`${x?.title}`}]  //1= data[1]?.sub[0]?.point -> her zaman yüzeyselin değeri olan "1'i" şlave edeceğiz
                                          
                                    })

                    return options

  }