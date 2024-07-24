const countTotalBs = (str) => {
  let length = str.length;
  let cnt = 0;
  for (let i = 0; i < length; i++) {
    if (str[i] == "B") {
      cnt++;
    }
  }
  return cnt;
};

const countChar = (str, char) => {
  let length = str.length;
  let cnt = 0;

  for (let i = 0; i < length; i++) {
    if (str[i] == char) {
      cnt++;
    }
  }
  return cnt;
};

const res = countTotalBs("BABA");
console.log(res);

const out = countChar("Xarterian", "a");
console.log(out);
