
export const data=
[
    {
      "title": "1",
      "sub": [
        {
          "title": "A Grubu",
          "description": "Kagir veya betonarme ihata eder.",
          "price": 650,
          "category":1,
          "code":"1A"
        },
        {
          "title": "B Grubu",
          "description": "Cam veya sert plastik örtülü yapılar.",
          "price": 990,
          "category":1,
          "code":"1B"
        }      
      ]
    },
    {
      "title": "2",
      "sub": [
        {
          "title": "C Grubu",
          "description": "Hangar yapıları",
          "price": 2865,
          "category":2,
          "code":"2C"
        }
      ]
    } 
  ]

  export const yapisinifiFunc = () => {

                let options:Array<object>=[];
                    data?.map(item=>{
                        //console.log("item:::..", item)
                        item?.sub?.map(x=>{
                                                options= [...options,  {value:{price:x?.price, code:x?.code, category:x?.category}, label:`${item?.title}${x?.title}`}]
                                          })
                                    })

                    return options

  }