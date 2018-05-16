import React from 'react';

class Gabon extends React.Component {
  render(){
    return (
      <div>
        <h1>My name is Gabon!</h1>
        <Kuliah/>
        <Alamat/>
      </div>
    )
  }
}

class Kuliah extends React.Component {
  render(){
    return (
      <div>
        <h2>Kuliah di ITB jurusan kota kembang LoL</h2>
      </div>
    )
  }
}

class Alamat extends React.Component {
  render(){
    return(
      <div>
        <h2>Tinggal di daerah kebon sawit</h2>
        <p>dekat sawah mbah cidug</p>
      </div>
    )
  }
}
export default Gabon;
