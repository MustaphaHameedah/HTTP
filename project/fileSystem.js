const fs = require("fs");

const writefilefunc = (path, data) => {
  fs.writeFile(path, JSON.stringify(data), "utf-8", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully");
    }
  });
};

const appendFileFunc = (path, data) => {
  fs.appendFile(path, data + "\n\n", "utf-8", (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("File appended successfully");
    }
  });
};

module.exports = { writefilefunc, appendFileFunc };
