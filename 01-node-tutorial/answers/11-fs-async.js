//async methods (won't block execution)
const { readFile, writeFile } = require("fs");

console.log("Start");
readFile("./content/first.txt", "utf8", (err, res) => {
  if (err) {
    console.error(err.message);
    return;
  }
  const first = res;
  readFile("./content/second.txt", "utf-8", (err, res) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const second = res;
    writeFile(
      "./content/third-async.txt",
      `Here is the result:\n${first}\n${second}`,
      (err, res) => {
        if (err) {
          console.err(err.message);
          return;
        }
        console.log("Done writting");
      }
    );
  });
});
console.log("Starting next task");
