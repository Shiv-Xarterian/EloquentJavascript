class Iterator {
  constructor(group) {
    this.group = group;
  }
  next() {
    if (this.group.length > 0) {
      {
        let value = this.group[0];
        this.group.splice(0, 1);
        return { value, done: false };
      }
    } else {
      return { done: true };
    }
  }
}

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

Group.prototype[Symbol.iterator] = function () {
  return new Iterator(this);
};

let group = Group.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(group);

for (let item of group.group) {
  console.log(item);
}
