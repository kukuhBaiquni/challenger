function indexPrime(param1){
let hasil = [];
if (param1<1){
  return 'mulai dari 1'
}else if(param1 == 1){
  return 2
}else {
  for (let i=2; i<=param1*param1; i++){
    for (let j=2; j<=i; j++){
      if (j==i){
        hasil.push(i)
      } if (i%j==0){
        break;
      }
    }
  }return hasil[param1-1]
}

}
console.log(indexPrime(4))    //7
console.log(indexPrime(500))  //3571
console.log(indexPrime(37786))//450881
