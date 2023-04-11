const mongoose = require("mongoose");

// The schema is the structure of our models
// Extra properties passed from our request will be ignored
const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
