require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const excelRoutes = require("./Routes/excelRoutes");
const newsRoutes = require("./Routes/newsRoutes");
const userRouter = require("./Routes/user.router");

const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => console.log(`MongoDB connected`))
  .catch((err) => console.log(err));

app.use("/user", userRouter);
app.use(excelRoutes);
app.use(newsRoutes);

app.listen( process.env.PORT, () => {
  console.log(`Server is running on port ${ process.env.PORT}`);
});
