import express from "express";
import { userRouter } from "./routes/userRoutes.js";
import { db } from "./database/db.js";
import "dotenv/config";
import cors from "cors";

const app = express(); // 

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.listen(process.env.SERVER_PORT, () => {
  try {
    console.log("server has started http://localhost:3001/");
    db();
  } catch (error) {
    console.log(error.message);
  }
});
