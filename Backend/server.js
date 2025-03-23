import express from "express";
import { userRouter } from "./routes/userRoutes.js";
import { db } from "./database/db.js";
import "dotenv/config";
import cors from "cors";

const app = express(); // 

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  try {
    console.log("server has started http://localhost:3001/");
    db();
  } catch (error) {
    console.log(error.message);
  }
});
