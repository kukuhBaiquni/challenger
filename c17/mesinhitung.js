export default class MesinHitung{
  constructor(){
    this.x = 1;
  }

  add(i){
    this.x += i;
    return this;
  }
  substract(i){
    this.x -= i;
    return this;
  }
  divide(i){
    this.x /= i;
    return this;
  }
  multiply(i){
    this.x*=i;
    return this;
  }
  square(i){
    if(i===undefined){
      this.x = Math.pow(this.x,2)
      return this;
    }else{
      this.x = Math.pow(this.x,i);
      return this;
    }
  }
  get Pi(){
    return 22/7;
  }
  squareRoot(){
    this.x = Math.sqrt(this.x)
    return this;
  }
  exponent(i){
    this.x = Math.pow(this.x,i);
    return this;
  }
  result(){
    console.log(this.x);
  }
}
