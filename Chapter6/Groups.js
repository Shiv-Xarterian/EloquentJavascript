class Group {
  constructor() {
    this.group = [];
  }

  add(item) {
    if (!this.have(item)) {
      this.group.push(item);
    }
  }
  have(item) {
    let idx = this.group.indexOf(item);
    if (idx == -1) return false;
    return true;
  }
  delete(item) {
    if (this.have(item)) {
      let idx = this.group.indexOf(item);
      this.group.splice(idx, 1);
    }
  }

  static from(arr) {
    let group = new Group();
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      group.add(arr[i]);
    }
    return group;
  }
}
let group = Group.from([1, 2, 3]);
group.delete(1);
const res = group.have(1);
console.log(res);
