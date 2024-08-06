const fs = require("fs");
const path = require("path");

const [, , pattern, ...filePaths] = process.argv;

const regex = new RegExp(pattern, "i");

const SingleFile = (file) => {
  fs.readFile(file, "utf-8", (error, data) => {
    if (error) console.log(`Error in ${file}`);
    else if (regex.test(data)) {
      console.log(file);
    }
  });
};

const DirectoryCheck = (file) => {
  fs.readdir(file, (error, files) => {
    if (error) console.log(`Error in ${file}`);
    else {
      for (const item of files) {
        const fullpath = path.join(file, item);
        fs.stat(fullpath, (error, stats) => {
          if (error) console.log(`Error in ${fullpath} Directory`);
          else if (stats.isFile()) {
            SingleFile(fullpath);
          } else if (stats.isDirectory()) {
            DirectoryCheck(fullpath);
          } else {
            console.log(`${item} is neither a file nor a directory.`);
          }
        });
      }
    }
  });
};

for (let item of filePaths) {
  fs.stat(item, (error, stats) => {
    if (error) {
      console.error(`Error getting stats for ${item}:`, error.message);
      return;
    } else if (stats.isFile()) {
      SingleFile(item);
    } else if (stats.isDirectory()) {
      DirectoryCheck(item);
    } else {
      console.log(`${item} is neither a file nor a directory.`);
    }
  });
}
