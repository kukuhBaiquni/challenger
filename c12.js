const fs = require('fs')

const fileName = process.argv[2];

const soal = fs.readFileSync(fileName, 'utf8');
const soalJadi = JSON.parse(soal);

const readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout)
let salah = 0;
let i = 0;
let totalSkip = 0;
let skipped = [];
let c = 0;

console.log(`Selamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari \nfile ${fileName}.`);
console.log(`Untuk bermain, jawablah dengan jawaban yang sesuai`);
console.log('Gunakan \'skip\' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan \nditanyakan lagi.\n');

rl.setPrompt(soalJadi[i].Pertanyaan);
rl.prompt();
rl.on('line', function(jawaban){
  if(i<soalJadi.length){
    if(jawaban==='skip'){
      skipped.push(soalJadi[i]);
      i++;
      salah=0;
      if(i<soalJadi.length){
        rl.setPrompt(soalJadi[i].Pertanyaan);
        rl.prompt();
      }else{
        if(skipped.length>0){
          rl.setPrompt(skipped[0].Pertanyaan);
          rl.prompt();
          if(jawaban===skipped[0].Tebakan){

            console.log('\nSelamat anda benar!!!\n');
            skipped.splice(0,1);
            rl.setPrompt(skipped[0].Pertanyaan);
            rl.prompt();
          }else{
            salah++;
            rl.setPrompt(skipped[0].Pertanyaan);
            rl.prompt();
          }
        }else{
          console.log('\nHore anda menang!');
          rl.close();
        }
      }

    }else if(jawaban===soalJadi[i].Tebakan){
      console.log('\nSelamat anda benar!!!\n');
      i++;
      if(i<soalJadi.length){
        rl.setPrompt(soalJadi[i].Pertanyaan);
        rl.prompt();
      }else{

        if(skipped.length>0){
          rl.setPrompt(skipped[0].Pertanyaan);
          rl.prompt();
          if(jawaban===skipped[0].Tebakan){

            console.log('\nSelamat anda benar!!!\n');
            skipped.splice(0,1);
            rl.setPrompt(skipped[0].Pertanyaan);
            rl.prompt();
          }else{
            salah++;
            rl.setPrompt(skipped[0].Pertanyaan);
            rl.prompt();
          }
        }else{
          console.log('\nHore anda menang!');
          rl.close();
        }
      }

    }else{
      salah++
      console.log(`\nAnda kurang beruntung! Anda telah salah ${salah} kali, silahkan coba lagix!\n`);
      rl.setPrompt(soalJadi[i].Pertanyaan);
      rl.prompt();
    }
  }else{
    if(i<soalJadi.length){
      rl.setPrompt(soalJadi[i].Pertanyaan);
      rl.prompt();
    }else{
      if(skipped.length>0){

        if(jawaban===skipped[0].Tebakan){

          console.log('\nSelamat anda benar!!!\n');
          skipped.splice(0,1);
          if(skipped.length===0){
            console.log('\nHore anda menang!');
            rl.close();
          }else{
            rl.setPrompt(skipped[0].Pertanyaan);
            rl.prompt();
          }

        }else{
          salah++
          console.log(`\nAnda kurang beruntung! Anda telah salah ${salah} kali, silahkan coba lagif!\n`);
          rl.setPrompt(skipped[0].Pertanyaan);
          rl.prompt();
        }
      }else{
        console.log('\nHore anda menang!');
        rl.close();
      }
    }
  }
})
