const EventEmmiter = require("events");

const customEmitter = new EventEmmiter();

// can receive arguments from events
customEmitter.on("response", (arg) => {
  console.log(`Data received: ${arg}`);
});

customEmitter.on("response", () => {
  console.log("some other logic here");
});

customEmitter.emit("response", "data passed");
