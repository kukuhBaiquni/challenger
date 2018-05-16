const fs = require('fs');

const logic = fs.readFileSync('logical.json', 'utf8');

const logicObj = JSON.parse(logic);

const readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout)

console.log('\nSelamat datang dipermainan tebak kata, jawab dengan benar ya!!\n');

let i=0

  console.log('Pertanyaan ke-'+(i+1));
  rl.setPrompt(logicObj[i].Pertanyaan);
  rl.prompt();
  rl.on('line', function(jawaban){
    if(jawaban===logicObj[i].Tebakan){
      console.log('\nSelamat anda benar!\n');
      i++;
      if(i<logicObj.length){
        console.log('Pertanyaan ke-'+(i+1));
        rl.setPrompt(logicObj[i].Pertanyaan);
        rl.prompt();
      }else{
        console.log('Hore anda menang!');
        rl.close()
      }
        }else{
      console.log('\nWkwkwk, anda kurang beruntung!\n');
    }
  })
