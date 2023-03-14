// CommonJS, every file is a module, by default
// Modules -> encapsulate code (only share minimum)
const names = require("./4-names.js");
const sayHi = require("./5-utils");
const data = require("./6-alternative-flavor");
require("./7-mind-grenade");

sayHi(names.john);
sayHi(names.peter);
sayHi("susan");
