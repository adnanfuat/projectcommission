
export const data=
[
  {
    "title": "1",
    "sub": [
      {
        "title": "A Grubu",
        "description": "Kagir veya betonarme ihata eder.",
        "price": 650,
        "category": 1,
        "code": "1A"
      },
      {
        "title": "B Grubu",
        "description": "Cam veya sert plastik örtülü yapılar.",
        "price": 990,
        "category": 1,
        "code": "1B"
      }
    ]
  },
  {
    "title": "2",
    "sub": [
      {
        "title": "A Grubu",
        "description": "",
        "price": 1650,
        "category": 2,
        "code": "2A"
      },
      {
        "title": "B Grubu",
        "description": "",
        "price": 2400,
        "category": 2,
        "code": "2B"
      },
      {
        "title": "C Grubu",
        "description": "",
        "price": 2685,
        "category": 2,
        "code": "2C"
      }
    ]
  },
  {
    "title": "3",
    "sub": [
      {
        "title": "A Grubu",
        "description": "",
        "price": 3450,
        "category": 3,
        "code": "3A"
      },
      {
        "title": "B Grubu",
        "description": "",
        "price": 4650,
        "category": 3,
        "code": "3B"
      }
    ]
  },
  {
    "title": "4",
    "sub": [
      {
        "title": "A Grubu",
        "description": "",
        "price": 4950,
        "category": 4,
        "code": "4A"
      },
      {
        "title": "B Grubu",
        "description": "",
        "price": 5900,
        "category": 4,
        "code": "4B"
      },
      {
        "title": "C Grubu",
        "description": "",
        "price": 6400,
        "category": 4,
        "code": "4C"
      }
    ]
  },
  {
    "title": "5",
    "sub": [
      {
        "title": "A Grubu",
        "description": "",
        "price": 7700,
        "category": 5,
        "code": "5A"
      },
      {
        "title": "B Grubu",
        "description": "",
        "price": 9350,
        "category": 5,
        "code": "5B"
      },
      {
        "title": "C Grubu",
        "description": "",
        "price": 10300,
        "category": 5,
        "code": "5C"
      },
      {
        "title": "D Grubu",
        "description": "",
        "price": 12150,
        "category": 5,
        "code": "5D"
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