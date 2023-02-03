
export const data=
[
  {
    "yapialani": 50,
    "siniflar": [0.0473, 0.0529, 0.0585,0.0641,0.0697]
  },
  {
    "yapialani": 100,
    "siniflar": [0.0464, 0.0520, 0.0576,0.0632,0.0688]
  }    
]


  export const projeUcretOraniFunc = ({m2, sinif}) => {

      let next=  data?.find(item=>item?.yapialani>=m2);

      let selection=0;

      

    if (!next) { // Sonraki yoksa diznin son elemanını al...
        next = data?.[data?.length-1] ?? 0
        selection=next;
    }
    else { // Sonraki varsa
      
        let index=  data?.findIndex(item=>item?.yapialani>=m2);   

        
        if (index!=0){ // İlk kayıttaysa önceki olmaz
          
          let before= data?.[index-1];
          let  diff = next?.yapialani-before?.yapialani;
          let half = (next?.yapialani-before?.yapialani)/2;

          let overflow = m2-before?.yapialani; // Bize gelen rakamla, önceki değer arasındaki fark.. Diyelim 602m2 geldi.. Ama bir önceki değer 600--- Overflow : 2
          // console.log("m2, sinifm2, sinif: ", diff, half)
            
                  if (overflow>=half) {
                    selection=next 
                  }
                  else {
                    selection=before
                  }

          } 
          else {
            selection=next; // İlk kayıtta bulduğunu al

            
          }


    }

    

    let relateddataOfCclass = selection?.siniflar?.[sinif-1] ?? 0;
    
     ///console.log("m2sinif", relateddataOfCclass)
                
                
                    return relateddataOfCclass

  }

