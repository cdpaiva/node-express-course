const fs = require("fs").promises;

const filePath = "./content/practice2.txt";
const lines = 10;

makeFile(filePath, lines);

/**
 * Creates a file with some text lines.
 *
 * @param {int} lines Number of lines to write
 * @param {string} filePath Path to the file
 */
async function makeFile(filePath, lines) {
  try {
    await fs.writeFile(filePath, getSentence(1));

    for (let i = 2; i <= lines; i++) {
      await fs.writeFile(filePath, getSentence(i), { flag: "a" });
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {int} i Line number
 * @returns String containing a line of text. Undefined for invalid inputs.
 */
function getSentence(i) {
  //Only accept numbers
  if (isNaN(i)) {
    return;
  }

  if (i === 1) {
    return "This is the first line.\n";
  } else {
    return `This is line ${i}\n`;
  }
}

/*
If we wanted to write the same code without async/await, things would became a bit less natural.
We could chain 10 .then() methods, but to avoid that, we are calling makeFile() again after each promise fulfills.
The fist case whitout the append flag was omitted just to simplify the code a bit.

function makeFile(i = 1) {
  fs.writeFile(filePath, getSentence(i), { flag: "a" })
    .then(() => {
      if (i < 10) {
        return makeFile(i + 1);
      }
    })
    .catch((err) => console.log(err));
}
*/
