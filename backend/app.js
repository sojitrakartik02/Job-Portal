import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Conn } from "./Database/connection.js";
import { errorMiddleware } from "./middleware/middlew.js";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js";
import jobRouter from "./router/jobRoutetr.js";
import appliRouter from "./router/appliRouter.js";
import { newsLetter } from "./automation/newsletter.js";
const app = express();

config({ path: "./confige/confige.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFilePath: "/tmp",
  })
);

app.use("/job/api/user", userRouter);
app.use("/job/api/job", jobRouter);
app.use("/job/api/application", appliRouter);
newsLetter();
Conn();

app.use(errorMiddleware);

export default app;
