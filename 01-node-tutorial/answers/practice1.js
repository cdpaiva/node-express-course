const sentence = require("./practice2.js");
const os = require("os");
const fs = require("fs");

const username = os.userInfo().username;

fs.writeFile(
  "./content/practice.txt",
  `${sentence}\n${username}`,
  (err, success) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Finished writing");
  }
);
