/*
    A detail that I found in the documentation. The globals described here are not global objects by definition.
    Before every module is executed, Node wraps it in a function, to namespace the variables.
    It will also provide some of the 'globals' listed here, as we can see from the wrapper function signature:

    (function(exports, require, module, __filename, __dirname) {
        // Module code actually lives in here
    });

    Reference: https://nodejs.org/api/modules.html#the-module-wrapper
*/

console.log(__dirname);
console.log(__filename);
