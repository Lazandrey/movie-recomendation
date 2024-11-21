import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import recommendationRouter from "./src/route/recommendation.js";
import userRouter from "./src/route/user.js";
import favoriteRouter from "./src/route/favorite.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION, { dbName: "recommendations" })
  .then(() => console.log("Connected!"))
  .catch(() => {
    console.log("bad connection");
  });
app.use(userRouter);
app.use(recommendationRouter);
app.use(favoriteRouter);

app.use((req, res) => {
  res.status(404).json({ response: "your endpoint does not exit" });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
