const DeepCompare = (obj1, obj2) => {
  if (typeof obj1 != typeof obj2) {
    return false;
  }

  if (typeof obj1 != "object") return obj1 === obj2;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  if (obj1 == null || obj2 == null) return false;

  for (const key of keys1) {
    if (obj2.hasOwnProperty(key) && DeepCompare(obj1[key], obj2[key])) {
      continue;
    } else return false;
  }
  return true;
};

let obj = { here: { is: "an" }, object: 2 };
const res = DeepCompare(obj, obj);
console.log(res);
