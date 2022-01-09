require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/Auth/auth");
const productRouter = require("./router/product/index");
const mongoose = require("mongoose");
const env = require("./config/env");

//DB CONNECT
mongoose.connect(env.database_connect, { useNewUrlParser: true }, () =>
  console.log("Connected to MongoDB")
);

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

//ROUTER
app.use("/api/users", authRouter);
app.use("/api/product", productRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is running at ${env.port}`)
);
