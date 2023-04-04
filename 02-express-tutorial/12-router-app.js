import express from "express";
import { peopleRouter } from "./routes/people.js";
import { authRouter } from "./routes/auth.js";

const PORT = 5000;
const app = express();

app.use(express.static("./methods-public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/api/people", peopleRouter);

// for me, this route could be called auth, to group related endpoints, like register, forgotPassword etc
app.use("/login", authRouter);

app.listen(PORT, () => `Started the server on port ${PORT}...`);
