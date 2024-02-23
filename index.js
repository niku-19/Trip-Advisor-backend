import express from "express";
import "./database/init.js";
import cors from "cors";
import tripAdvisorRouter from "./routes/tripAdvisor-route.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    message: "Hello World",
    data: null,
  });
});
app.use("/v1/api", tripAdvisorRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Routes not Found",
    method: `${req.method} ${req.url} is not allowed`,
    data: null,
  });
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    success: false,
    message: err.message,
    data: null,
  });
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
