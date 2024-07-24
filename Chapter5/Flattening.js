const flattenarray = (arr) => {
  let newarr = [];
  for (const item of arr) {
    let subarray = [];
    if (typeof item != "object") {
      subarray = [item];
    } else subarray = flattenarray(item);
    newarr = newarr.concat(subarray);
  }
  return newarr;
};

const res = flattenarray([[1, 2, 3], [4, 5], [6]]);
console.log(res);

//with reduce and concat

const flattenbyreduce = (arr) => {
  let newarr = [];
  newarr = arr.reduce((newarr, item) => {
    return newarr.concat(item);
  });
  /*

  newarr = [] -> accumulator
  newarr = [] concat [1 2 3]-> [1 2 3]
  newarr = [1 2 3] concat [4 5]-> [1 2 3 4 5]
  newarr = [1 2 3 4 5] concat [6] -> [1 2 3 4 5 6]
   */
  return newarr;
};

const result = flattenbyreduce([[1, 2, 3], [4, 5], [6]]);
console.log(result);
