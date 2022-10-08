import createError from "http-errors"; //to catch errors
import express, { Request, Response, NextFunction } from "express"; //to run your server
import path from "path"; //to resolve path issues
import cookieParser from "cookie-parser"; //catch cookies on the browser
import logger from "morgan"; //morgan is the one showing the status code notification
import db from "./config/database.config";

import pagesRouter from './routes/pages'
import userRouter from "./routes/user";
import listRouter from "./routes/list";

db.sync()
  .then(() => {
    // force:true helps update the database authomatically
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");



app.get('/list/create', (req, res) =>{
  res.render("create")
})

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

app.use("/user", userRouter);
app.use("/list", listRouter);
app.use('/', pagesRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);

  res.render("error");
});
export default app;