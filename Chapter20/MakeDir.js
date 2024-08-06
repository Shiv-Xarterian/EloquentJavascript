const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method == "MKCOL") {
    fs.mkdir(filePath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory ${filePath}:`, err.message);
        res.statusCode = 500;
        res.end("Error creating directory");
      } else {
        res.statusCode = 201; // Created
        res.end("Directory created");
      }
    });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
