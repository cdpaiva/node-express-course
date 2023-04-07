import express from "express";
import {
  getPeople,
  createPerson,
  createPersonPostman,
  deletePerson,
  updatePerson,
} from "../controllers/people.js";

export const peopleRouter = express.Router();

peopleRouter.get("/", getPeople);

peopleRouter.post("/", createPerson);

peopleRouter.post("/postman", createPersonPostman);

peopleRouter.put("/:id", updatePerson);

peopleRouter.delete("/:id", deletePerson);
