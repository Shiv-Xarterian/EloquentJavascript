const ConvertArrayToList = (ind, arr) => {
  if (ind == arr.length) return null;
  let obj = ConvertArrayToList(ind + 1, arr);
  let res = {
    value: arr[ind],
    rest: obj,
  };
  return res;
};

const list = ConvertArrayToList(0, [1, 2, 3, 4, 5, 6]);
console.log(list);
