const url = `https://eloquentjavascript.net/author`;
const types = ["text/plain", "text/html", "application/json"];

for (const item of types) {
  const result = fetch(url, { headers: { accept: item } });
  result.then((res) => {
    res.text().then((txt) => {
      console.log(txt);
    });
  });
}
