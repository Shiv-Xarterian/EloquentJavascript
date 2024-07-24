const checkOddEven = (num) => {
  if (num == 0) return "Even";
  if (num == 1) return "Odd";
  return checkOddEven(num - 2);
};

const res = checkOddEven(10000);
console.log(res);
