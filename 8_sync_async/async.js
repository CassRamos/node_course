const fs = require("fs");

console.log("Start");

fs.writeFile("file.txt", "Hello", () => {
  setTimeout(() => {
    console.log("Create file");
  },1000);
});

console.log("End");
