/*
    Functions invoked inside of a module will be executed when they are imported in another file.
*/

const num1 = 5;
const num2 = 10;

function addValues() {
  console.log(`the sum is: ${num1 + num2}`);
}

addValues();
