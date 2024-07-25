class Group {
  constructor() {
    this.group = [];
  }

  #add(item) {
    if (!this.have(item)) {
      this.group.push(item);
    }
  }
  add(item) {
    let group = new Group();
    if (!this.have(item)) {
      group.#add(item);
    }
    for (let i = 0; i < this.group.length; i++) {
      group.#add(this.group[i]);
    }
    return group;
  }
  have(item) {
    let idx = this.group.indexOf(item);
    if (idx == -1) return false;
    return true;
  }
  #delete(item) {
    if (this.have(item)) {
      let idx = this.group.indexOf(item);
      this.group.splice(idx, 1);
    }
  }
  delete(item) {
    let group = new Group();
    let len = this.group.length;
    for (let i = 0; i < len; i++) {
      if (this.group[i] != item) group.#add(this.group[i]);
    }
    return group;
  }

  static from(arr) {
    let group = new Group();
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      group.#add(arr[i]);
    }
    return group;
  }
}
let group = Group.from([1, 2, 3]);
console.log(group);
let ngroup = group.delete(1);
console.log(group, ngroup);
