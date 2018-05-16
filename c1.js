function c1 (){
  let hasil = 0
  for (var i = 0; i < arguments.length; i++) {
    hasil+=arguments[i]
  }
  return hasil
}

console.log(c1(1,2,3));
console.log(c1(3,56,11));
console.log(c1(9));
