function spiral(param1){
  let hasil = [];
  let array1 =[];

  for(let i=0; i<param1; i++){
    array1[i]=[];
    for(let j=0; j<param1; j++){
      if(i<1){
        array1[i].push(j);
      } else {
        array1[i].push(j+(i*param1))
      }
    }
  }
  while(array1.length>1){
        hasil= hasil.concat(array1.splice(0,1)[0]);
      for(let k in array1){
        hasil.push(array1[k].splice(-1)[0])
    }
        hasil= hasil.concat(array1.splice(-1,1)[0].reverse());
      for(let k=array1.length-1; k>=0; k--){
        hasil.push(array1[k].splice(0,1)[0]);
    }
  }
    if(array1.length>0){
      hasil.push(array1.pop()[0]);
  }
  return hasil.toString()
}
console.log(spiral(5));
console.log(spiral(6));
console.log(spiral(7));
