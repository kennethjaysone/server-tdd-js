import express from "express";
import db from "./db";

const app = express();

app.get("/users/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.getUserByUsername(username);
    if (result) {
      return res.status(200).json(result);
    }
    res.status(404).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

export default app;
