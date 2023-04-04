import express from "express";
import { people } from "./data.js";

const PORT = 5000;
const app = express();

app.use(express.static("./methods-public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  res.status(401).send("Please Provide Credentials");
});

app.post("/api/postman/people", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people] });
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const newName = req.body.name;

  const person = people.find((p) => p.id === Number(id));
  if (!person) {
    return res.status(404).json({ success: false, msg: "Id not found" });
  }

  const newPeople = people.map((p) => {
    if (p.id === Number(id)) {
      p.name = newName;
    }
    return p;
  });
  return res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const id = Number(req.params.id);
  // if we cannot parse the id, send back an error msg
  if (isNaN(id)) {
    return res.status(404).json({ success: false, msg: "Invalid id value" });
  }

  // we could also ignore this check and just accept that if the id
  // is not in the DB, delete would do nothing
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ success: false, msg: "Id not found" });
  }

  const newPeople = people.filter((p) => p.id !== id);

  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(PORT, () => `Started the server on port ${PORT}...`);
