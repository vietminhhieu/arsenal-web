require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/Auth/auth");
const productRouter = require("./router/product/index");
const mongoose = require("mongoose");

//DB CONNECT
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to MongoDB")
);

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

//ROUTER
app.use("/api/users", authRouter);
app.use("/product", productRouter);

app.listen(process.env.PORT, () => console.log("Server up and running"));
