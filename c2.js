let cek = [];
function deretKaskus(n){
  for (let i=3; i<=n*3; i=i+3){
    if (i%5 === 0 && i%6 === 0){
      cek.push('KASKUS')
    } else if (
      i%5 === 0){
        cek.push('KAS')
      } else if (
        i%6 === 0){
          cek.push('KUS')
        } else {
          cek.push(i)
        }
  }return cek
}
console.log(deretKaskus(10))
