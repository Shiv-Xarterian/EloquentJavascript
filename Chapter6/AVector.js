class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(a) {
    let newVec = new Vec(0, 0);
    newVec.x = this.x + a.x;
    newVec.y = this.y + a.y;
    return newVec;
  }

  minus(a) {
    let newVec = new Vec(0, 0);
    newVec.x = this.x - a.x;
    newVec.y = this.y - a.y;
    return newVec;
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)).toPrecision(2);
  }
}

let one = new Vec(1, 2);
let two = new Vec(3, 4);

let p = one.plus(two);
let m = one.minus(two);
console.log(p, m);

let len = one.length;
console.log(len);
