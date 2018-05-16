
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Table = require('cli-table');

var table = new Table({
  head: ['NIM', 'Nama', 'Alamat', 'Jurusan']
  , colWidths: [10, 10, 15, 20]
});

var table3 = new Table({
  head: ['ID', 'Nama Jurusan']
  , colWidths: [5, 25]
});

var table2 = new Table({
  head: ['ID', 'Nama']
  , colWidths: [10, 10]
});

var table4 = new Table({
  head: ['ID', 'Nama', 'SKS']
  , colWidths: [5, 20, 5]
});

var table5 = new Table({
  head: ['ID', 'NIM', 'IDMK', 'ID DOSEN', 'Nilai']
  , colWidths: [5, 10, 10, 15, 10]
});

table4.push(
  ['1', 'Kesenian', '7'],
  ['2', 'Olahraga', '10'],
  ['3', 'Fisika', '12']
);

table3.push(
  ['1', 'Teknik Informatika'],
  ['2', 'Teknik Elektro'],
  ['3', 'Psikologi']
);

table2.push(
  ['1', 'Rubi'],
  ['2', 'Reky']
);

table.push(
  ['001000', 'Jinzak', 'Runettera', '3'],
  ['001001', 'DarkSeer', 'Noxus', '1'],
  ['001002', 'Dora', 'Demacia', '2']
);

function login(){
  console.log('==================================================');
  console.log('Welcome to Universitas Pendidikan Indonesia\nJl Setiabudhi No. 255');
  console.log('==================================================');
  username();
}
login()

function username(){
  rl.question('username: ', (jawab)=>{
    if (jawab==='kukuh'){
      pass();
    }else{
      console.log('username salah!\n');
      username()
    }
  })
}

function pass(){
  rl.question('password: ', (jawab)=>{
    if (jawab==='123'){
      mainMenu();
    }else{
      console.log('password salah!\n');
      pass()
    }
  })
}

function mainMenu(){
  console.log(`\nWelcome kukuh, your access level is Admin.`);
  console.log('==================================================');
  console.log('silahkan pilih opsi dibawah ini: ');
  console.log('\n[1] Mahasiswa\n[2] Jurusan\n[3] Dosen\n[4] Mata Kuliah\n[5] Kontrak\n[6] Keluar');
  console.log('==================================================');

  rl.question('masukan salah satu no. dari opsi diatas: ', (jawab)=>{
    switch (jawab) {
      case '1':
      mahasiswaMain();
      break;

      case '2':
      jurusanMain();
      break;

      case '3':
      dosenMain();
      break

      case '4':
      mkMain();
      break;

      case '5':
      kontrakMain()
      break;

      case '6':
      console.log('==================================================');
      console.log('kamu telah keluar.');
      login()
      break;
      default:
      console.log('Invalid input!');
      mainMenu()
      break;
    }
  })
}
function mahasiswaMain(){
  console.log('==================================================');
  console.log('silahkan pilih opsi dibawah ini: ');
  console.log('\n[1] Daftar Murid\n[2] Cari Murid\n[3] Tambah Murid\n[4] Hapus Murid\n[5] kembali');
  console.log('=====================================================');
  rl.question('masukan salah satu no. dari opsi diatas: ', (jawab)=>{
    switch (jawab) {
      case '1':

      console.log(table.toString());
      mahasiswaMain();
      break;

      case '2':
      mahasiswa2()
      break;

      case '3':
      mahasiswa3()
      break;

      case '4':
      mahasiswa4()
      break;

      case '5':
      mainMenu()
      break;

      default:
      console.log('Invalid input!');
      mahasiswaMain()
      break;
    }
  })
}

function mahasiswa2(){
  let oi = 0;
  console.log('==================================================');
  rl.question('Masukan NIM: ', (jawab)=>{
    for(let i=0; i<table.length; i++){
      if(table[i][0]==jawab){
        oi+=i;
      }
    }
    if(table[oi][0]==jawab){
      console.log('==================================================');
      console.log('Student details');
      console.log('==================================================');
      console.log(`Id       : ${table[oi][0]}`);
      console.log(`Nama     : ${table[oi][1]}`);
      console.log(`Alamat   : ${table[oi][2]}`);
      console.log(`Jurusan  : ${table[oi][3]}`);
      mahasiswaMain();
    }else {
      console.log(`Mahasiswa dengan nim ${jawab} tidak terdaftar!!`);
      mahasiswa2();
    }
  })
}

function mahasiswa3(){
  let tumpeng =[];
  console.log('==================================================');
  console.log('Lengkapi data dibawah ini');
  rl.question('NIM: ', (jawab)=>{
    tumpeng.push(jawab);
    mahasiswa31();

    function mahasiswa31(){
      rl.question('Nama: ', (jawab)=>{
        tumpeng.push(jawab);
        mahasiswa32();

        function mahasiswa32(){
          rl.question('Alamat: ', (jawab)=>{
            tumpeng.push(jawab);
            mahasiswa33();

            function mahasiswa33(){
              rl.question('Jurusan: ', (jawab)=>{
                tumpeng.push(jawab);
                table.push(tumpeng);
                console.log(table.toString());
                console.log('\nSukses menambahkan murid!');
                mahasiswaMain();
              })
            }
          });
        }
      });
    }
  });
}

function mahasiswa4(){
  let woi = 0;
  console.log('==================================================');
  rl.question('masukan NIM mahasiswa yang ingin di hapus: ', (jawab)=>{
    for(let j=0; j<table.length; j++){
      if(table[j][0]==jawab){
        woi+=j
      }
    }if(table[woi][0]==jawab){
      console.log(`\nMahasiswa dengan NIM ${(table[woi][0])} berhasil dihapus!`);
      table.splice(woi,1);
      console.log(table.toString());
      mahasiswaMain();
    }else{
      console.log('NIM mahasiswa tidak terdaftar!');
      mahasiswa4();
    }
  })
}

function dosenMain(){
  console.log('==================================================');
  console.log('silahkan pilih opsi dibawah ini: ');
  console.log('\n[1] Daftar Dosen\n[2] Cari Dosen\n[3] Tambah Dosen\n[4] Hapus Dosen\n[5] kembali');
  rl.question('masukan salah satu no. dari opsi diatas: ', (jawab)=>{
    switch (jawab) {
      case '1':

      console.log(table2.toString());
      dosenMain();
      break;

      case '2':
      dosen2();
      break;

      case '3':
      dosen3()
      break;

      case '4':
      dosen4()
      break;

      case '5':
      mainMenu()
      break;

      default:
      console.log('Invalid input!');
      dosenMain()
      break;
    }
  })
}

function dosen2(){
  let doi = 0
  console.log('==================================================');
  rl.question('Masukan ID DOSEN: ', (jawab)=>{
    for(let d=0; d<table2.length; d++){
      if(table2[d][0]==jawab){
        doi+=d;
      }
    }
    if(table2[doi][0]==jawab){
      console.log('==================================================');
      console.log('Dosen details');
      console.log('==================================================');
      console.log(`ID DOSEN : ${table2[doi][0]}`);
      console.log(`Nama     : ${table2[doi][1]}`);
      dosenMain();
    }else {
      console.log(`Dosen dengan ID ${jawab} tidak terdaftar!!`);
      dosen2();
    }
  })
}

function dosen3(){
  let tumpengd =[];
  console.log('==================================================');
  console.log('Lengkapi data dibawah ini');
  rl.question('ID DOSEN: ', (jawab)=>{
    tumpengd.push(jawab);
    dosen31();

    function dosen31(){
      rl.question('Nama: ', (jawab)=>{
        tumpengd.push(jawab);
        table2.push(tumpengd);
        console.log(table2.toString());
        console.log('\nSukses menambahkan dosen!');
        dosenMain();
      });
    }
  });
}

function dosen4(){
  let dwoi = 0;
  console.log('==================================================');
  rl.question('masukan ID dosen yang ingin di hapus: ', (jawab)=>{
    for(let k=0; k<table2.length; k++){
      if(table2[k][0]==jawab){
        dwoi+=k
      }
    }if(table2[dwoi][0]==jawab){
      console.log(`\nDosen dengan ID ${(table2[dwoi][0])} berhasil dihapus!`);
      table2.splice(dwoi,1);
      console.log(table2.toString());
      dosenMain();
    }else{
      console.log('ID dosen tidak terdaftar!');
      dosen4();
    }
  })
}

function jurusanMain(){
  console.log('==================================================');
  console.log('silahkan pilih opsi dibawah ini: ');
  console.log('\n[1] Daftar Jurusan\n[2] Cari Jurusan\n[3] Tambah Jurusan\n[4] Hapus Jurusan\n[5] kembali');
  rl.question('masukan salah satu no. dari opsi diatas: ', (jawab)=>{
    switch (jawab) {
      case '1':

      console.log(table3.toString());
      jurusanMain();
      break;

      case '2':
      jurusan2();
      break;

      case '3':
      jurusan3()
      break;

      case '4':
      jurusan4()
      break;

      case '5':
      mainMenu()
      break;

      default:
      console.log('Invalid input!');
      jurusanMain()
      break;
    }
  })
}

function jurusan2(){
  let joi = 0
  console.log('==================================================');
  rl.question('Masukan ID: ', (jawab)=>{
    for(let l=0; l<table3.length; l++){
      if(table3[l][0]==jawab){
        joi+=l;
      }
    }
    if(table3[joi][0]==jawab){
      console.log('==================================================');
      console.log('Jurusan details');
      console.log('==================================================');
      console.log(`Id       : ${table3[joi][0]}`);
      console.log(`Nama     : ${table3[joi][1]}`);
      jurusanMain();
    }else {
      console.log(`Jurusan dengan ID ${jawab} tidak terdaftar!!`);
      jurusan2();
    }
  })
}

function jurusan3(){
  let tumpengj =[];
  console.log('==================================================');
  console.log('Lengkapi data dibawah ini');
  rl.question('ID: ', (jawab)=>{
    tumpengj.push(jawab);
    jurusan31();

    function jurusan31(){
      rl.question('Nama: ', (jawab)=>{
        tumpengj.push(jawab);
        table3.push(tumpengj);
        console.log(table3.toString());
        console.log('\nSukses menambahkan jurusan!');
        jurusanMain();
      });
    }
  });
}

function jurusan4(){
  let jwoi = 0;
  console.log('==================================================');
  rl.question('masukan ID jurusan yang ingin di hapus: ', (jawab)=>{
    for(let m=0; m<table3.length; m++){
      if(table3[m][0]==jawab){
        jwoi+=m
      }
    }if(table3[jwoi][0]==jawab){
      console.log(`\nJurusan dengan ID ${(table3[jwoi][0])} berhasil dihapus!`);
      table3.splice(jwoi,1);
      console.log(table3.toString());
      jurusanMain();
    }else{
      console.log('ID jurusan tidak terdaftar!');
      jurusan4();
    }
  })
}

function mkMain(){
  console.log('==================================================');
  console.log('silahkan pilih opsi dibawah ini: ');
  console.log('\n[1] Daftar Mata Kuliah\n[2] Cari Mata Kuliah\n[3] Tambah Mata Kuliah\n[4] Hapus Mata Kuliah\n[5] kembali');
  rl.question('masukan salah satu no. dari opsi diatas: ', (jawab)=>{
    switch (jawab) {
      case '1':

      console.log(table4.toString());
      mkMain();
      break;

      case '2':
      mk2();
      break;

      case '3':
      mk3()
      break;

      case '4':
      mk4()
      break;

      case '5':
      mainMenu()
      break;

      default:
      console.log('Invalid input!');
      mkMain()
      break;
    }
  })
}

function mk2(){
  let moi = 0
  console.log('==================================================');
  rl.question('Masukan IDMK: ', (jawab)=>{
    for(let n=0; n<table4.length; n++){
      if(table4[n][0]==jawab){
        moi+=n;
      }
    }
    if(table4[moi][0]==jawab){
      console.log('==================================================');
      console.log('Mata Kuliah details');
      console.log('==================================================');
      console.log(`IDMK     : ${table4[moi][0]}`);
      console.log(`Nama     : ${table4[moi][1]}`);
      console.log(`SKS      : ${table4[moi][2]}`);
      mkMain();
    }else {
      console.log(`IDMK ${jawab} tidak terdaftar!!`);
      mk2();
    }
  })
}

function mk3(){
  let tumpengm =[];
  console.log('==================================================');
  console.log('Lengkapi data dibawah ini');
  rl.question('IDMK: ', (jawab)=>{
    tumpengm.push(jawab);
    mk31();

    function mk31(){
      rl.question('Nama: ', (jawab)=>{
        tumpengm.push(jawab);
        mk32();

        function mk32(){
          rl.question('SKS: ', (jawab)=>{
            tumpengm.push(jawab);
            table4.push(tumpengm);
            console.log(table4.toString());
            console.log('\nSukses menambahkan mata kuliah!');
            mkMain();
          })
        }
      });
    }
  });
}

function mk4(){
  let mwoi = 0;
  console.log('==================================================');
  rl.question('masukan IDMK mata kuliah yang ingin di hapus: ', (jawab)=>{
    for(let o=0; o<table4.length; o++){
      if(table4[o][0]==jawab){
        mwoi+=o
      }
    }if(table4[mwoi][0]==jawab){
      console.log(`\nMata kuliah dengan IDMK ${(table4[mwoi][0])} berhasil dihapus!`);
      table4.splice(mwoi,1);
      console.log(table4.toString());
      mkMain();
    }else{
      console.log('IDMK tidak terdaftar!');
      mk4();
    }
  })
}

function kontrakMain(){
  console.log('==================================================');
  console.log('silahkan pilih opsi dibawah ini: ');
  console.log('\n[1] Daftar Kontrak\n[2] Cari Kontrak\n[3] Tambah Kontrak\n[4] Hapus Kontrak\n[5]kembali');
  rl.question('masukan salah satu no. dari opsi diatas: ', (jawab)=>{
    switch (jawab) {
      case '1':

      console.log(table5.toString());
      kontrakMain();
      break;

      case '2':
      mainMenu()
      break;

      case '3':
      mainMenu()
      break;

      case '4':
      mainMenu()
      break;

      case '5':
      mainMenu()
      break;

      default:
      console.log('Invalid input!');
      kontrakMain()
      break;
    }
  })
}
