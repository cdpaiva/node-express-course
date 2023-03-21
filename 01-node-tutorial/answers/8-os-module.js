//Built-in modules do not require extra dependencies
const os = require("os");

//info about current user
const user = os.userInfo();
console.log(user);

//system uptime in seconds
console.log(os.uptime()); //173286 = 2days!

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};

console.log(currentOS);
