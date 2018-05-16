class CarFactory{
  constructor(nama){
    this._nama=nama;
    this._produksi=0;
  }
  get nama(){
    return this._nama;
  }
  produksi(){
    return this._produksi += Math.floor(Math.random()*30)
  }
}

class Car  {
  constructor(nama,merk){
    super(nama);
    this._merk=merk;
  }
}

const avanza = new CarFactory('Avanza');
console.log(avanza.produksi());
