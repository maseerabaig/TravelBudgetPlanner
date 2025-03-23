import express from "express";
import { userRouter } from "./routes/userRoutes.js";
import { db } from "./database/db.js";
import "dotenv/config";
import cors from "cors";

const app = express(); // 

app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: "*",  // Allow all origins (for testing)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true
}));

// Handle Preflight Requests (Important for POST/PUT Requests)
app.options("*", (req, res) => {
  res.sendStatus(200);
});


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
