import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

//import all routes
import user from "./routes/user.routes";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(fileUpload());
// app.use(cookieParser());

//morgan logger
app.use(morgan("tiny"));

//router middleware
app.use("/api/v1/", user);

//404 "not found" route
app.use((req, res, next) => {
  res.status(404).send('Sorry, the page not found check url');
});

export default app;
