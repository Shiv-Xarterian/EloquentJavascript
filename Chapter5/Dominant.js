function getDirection(ch) {}
function dominantDirection(text) {
  const mp = {};

  for (let c of text) {
    let dir = getDirection(c);
    if (mp.OwnProperty(dir)) {
      mp[dir] = mp[dir] + 1;
    } else mp[dir] = 1;
  }

  let res;
  let amount = 0;

  for (let item of mp) {
    if (mp[item] > amount) {
      res = item;
      amount = mp[item];
    }
  }

  return res;
}

console.log(dominantDirection("Hello!"));

console.log(dominantDirection("Hey, مساء الخير"));
