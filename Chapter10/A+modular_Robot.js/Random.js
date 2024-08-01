const randomPick = (arr) => {
  let len = arr.length;
  let idx = parseInt(Math.random() * len);
  return arr[idx];
};

module.exports = { randomPick };
