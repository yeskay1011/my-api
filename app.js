// app.js

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./routes/userRoutes");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors("*"));
app.use(express.json());

// Test API call
const testCall = (req, res) => {
  console.log("Test call");
  res.status(200).json({
    message: "Test run successfully!",
  });
};

app.get("/test", testCall);
app.use("/", User);

module.exports = app;
