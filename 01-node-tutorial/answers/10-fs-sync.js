const { readFileSync, writeFileSync } = require("fs");

console.log("start");
const first = readFileSync("./content/first.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");

console.log(first);
console.log(second);

writeFileSync(
  "./content/third.txt",
  `Here is the result:\n${first}\n${second}`
);

console.log("done with the task");
