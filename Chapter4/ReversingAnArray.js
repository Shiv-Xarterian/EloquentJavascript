const ReverseArray = (arr) => {
  let newarr = [];
  let len = arr.length;

  for (let i = len - 1; i >= 0; i--) {
    newarr.push(arr[i]);
  }

  return newarr;
};

// Two Pointer
const ReverseByTwoPointer = (arr) => {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    // [arr[i], arr[j]] = [arr[j], arr[i]];
    // by gpt

    let x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
    i++;
    j--;
  }

  return arr;
};

const reversearr = ReverseArray([1, 2, 3, 4]);
console.log(reversearr);

const arr = ReverseByTwoPointer([1, 2, 3, 4]);
console.log(arr);
