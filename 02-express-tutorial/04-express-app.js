import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// workaround because this is using ES6 modules
// I'm not sure why __dirname is not available
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;
const app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(PORT, () => console.log(`Started the server on port ${PORT}...`));
