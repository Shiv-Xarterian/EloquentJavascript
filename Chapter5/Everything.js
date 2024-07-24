const Checkarray = (arr, test) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (!test(arr[i])) return false;
  }
  return true;
};

const CheckArrayWithSome = (arr, test) => {
  let len = arr.length;
  return !arr.some((element) => !test(element));
  // arr.some(test) check of any one true
  // arr.some(!test) check of any false then true then we can catch whether their is catch or not
  // if catch is found some return true then return !some
};
console.log(CheckArrayWithSome([1, 2, 1], (n) => n < 10));
