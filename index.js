const express = require("express");
const app = express();
const env = require("./config/env");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/Auth/auth");
const categoryRouter = require("./router/category/category");
const productRouter = require("./router/product/product");
const extraInfoRouter = require("./router/extraInfo/extraInfo");
const feedbackRouter = require("./router/feedback/feedback");
const commentRouter = require("./router/comment/comment");

//DB CONNECT
mongoose.connect(env.database_connect, { useNewUrlParser: true }, () =>
  console.log("Connected to MongoDB")
);

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

//ROUTER
app.use("/api/users", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/information", extraInfoRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/comment", commentRouter);

app.listen(env.port, () => console.log(`Server is running at ${env.port}`));
