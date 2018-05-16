function pola(str){
  let hasil = [];
  let miss = str.split(' ');
  let cut1 = miss[0].indexOf('#');
  let cut2 = miss[4].indexOf('#');
  for(let i=0; i<10; i++){
    for(let j=0; j<10; j++){
      let digit1_1 = miss[0].slice(0,cut1);
      let digit1_2 = miss[0].slice(cut1+1, miss[0].length);
      let digit2_1 = miss[4].slice(0,cut2);
      let digit2_2 = miss[4].slice(cut2+1, miss[4].length);
      if((digit1_1+i+digit1_2)*miss[2]==digit2_1+j+digit2_2){
        hasil.push(i);hasil.push(j);}
    }
  }return hasil
}
console.log(pola("42#3 * 188 = 80#204"));  //[8, 5]
console.log(pola("8#61 * 895 = 78410#5")); //[7, 9]
