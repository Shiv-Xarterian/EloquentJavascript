const getRangeSum = (start, end) => {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};

const getRangeSumTotal = (start, end) => {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  return sum;
};

const getRangeSumWithStep = (start, end, step) => {
  let steps = step || 1;
  let arr = [];

  if (step > 0) {
    while (start <= end) {
      arr.push(start);
      start += step;
    }
  } else {
    while (start >= end) {
      arr.push(start);
      start += step;
    }
  }
  return arr;
};

const res = getRangeSum(1, 10);
console.log(res);

const rangesum = getRangeSumTotal(1, 10);
console.log(rangesum);

const rangestep = getRangeSumWithStep(5, 2, -1);
console.log(rangestep);
