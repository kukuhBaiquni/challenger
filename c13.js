const fs = require('fs');
const perintah = process.argv[2];
const leng = process.argv;
const dataToPush = leng.splice(3,leng.length);
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const nTag = dataToPush.slice(1,leng.length);
const nNum = dataToPush.slice(0,1);

console.log('>>> JS TODO <<<');
console.log('$ c13.js <command>');
console.log('$ c13.js list');
console.log('$ c13.js task <task_id>');
console.log('$ c13.js add <task_content>');
console.log('$ c13.js delete <task_id>');
console.log('$ c13.js complete <task_id>');
console.log('$ c13.js uncomplete <task_id>');
console.log('$ c13.js list:outstanding asc|desc');
console.log('$ c13.js list:completed asc|desc');
console.log('$ c13.js tag <task_id> <tag_name_1> ... <tag_name_n>');
console.log('$ c13.js filter:<tag_name>');

switch (perintah) {

  case 'add':
  data.push({task: dataToPush.join(' '), complete:false, tag:''});
  console.log(`\n"${dataToPush.join(' ')}" telah ditambahkan.`);
  let added = JSON.stringify(data, null, 3)
  let dataWrite1 = fs.writeFileSync('data.json', added, function(err){
    if(err) throw err;
  });
  break;

  case 'list':
  console.log('\nDaftar Pekerjaan:\n');
  for(let i=0; i<data.length; i++){
    console.log(`${i+1}. ${data[i].complete ? '[x]' : '[ ]'} ${data[i].task}.`)
  };
  break;

  case 'delete':
  console.log(`\n${data[dataToPush-1].task} telah dihapus dari daftar`);
  data.splice(dataToPush-1,1);
  let deleted = JSON.stringify(data, null, 3)
  let dataWrite2 = fs.writeFileSync('data.json', deleted, function(err){
    if(err) throw err;
  });
  break;

  case 'complete':
  console.log(`\n${data[dataToPush-1].task} telah selesai`);
  data[dataToPush-1].complete=true;
  let completed = JSON.stringify(data, null, 3);
  let dataWrite3 = fs.writeFileSync('data.json', completed, function(err){
    if(err) throw err;
  });
  break;

  case 'uncomplete':
  console.log(`\n${data[dataToPush-1].task} status selesai dibatalkan`);
  data[dataToPush-1].complete=false;
  let uncomplete = JSON.stringify(data, null, 3);
  let dataWrite4 = fs.writeFileSync('data.json', uncomplete, function(err){
    if(err) throw err;
  });
  break;

  case 'list:outstanding':
  console.log('\nPekerjaan yang belum selesai:\n');
      if(dataToPush=='asc'){
        for(let j=0; j<data.length; j++){
          if(data[j].complete===false){
            console.log(`${j+1}. [ ] ${data[j].task}`);
          }
        }
      }else{
        for(let j=data.length; j>0; j--){
          if(data[j-1].complete===false){
            console.log(`${j}. [ ] ${data[j-1].task}`);
          }
        }
      }
  break;

  case 'list:completed':
  console.log('\nPekerjaan yang sudah diselesaikan:\n');
  if(dataToPush=='asc'){
    for(let k=0; k<data.length; k++){
      if(data[k].complete===true){
        console.log(`${k+1}. [x] ${data[k].task}`);
      }
    }
  }else{
    for(let k=data.length; k>0; k--){
      if(data[k-1].complete===true){
        console.log(`${k}. [x] ${data[k-1].task}`);
      }
    }
  }
  break;

  case 'tag':
  console.log(`\nTag ${nTag.join(',')} telah ditambahkan ke daftar ${data[nNum-1].task}.`);
  data[nNum-1].tag=nTag;
  let tag = JSON.stringify(data, null, 3);
  let dataWrite5 = fs.writeFileSync('data.json', tag, function(err){
    if(err) throw err;
  });
  break;

  default:
  let filt = perintah.slice(7,perintah.length);
  console.log(`\nFilter: ${filt}`);
  for(let z=0; z<data.length; z++){
    if(data[z].tag.includes(filt)===true){
    console.log(`${z+1}. ${data[z].complete ? '[x]' : '[ ]'} ${data[z].task}.`)
    }
  }
  break;
}
