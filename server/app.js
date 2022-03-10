const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/index");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", router);

app.listen(PORT, async () => {
  console.log(`Working on ${PORT}`);
  await mongoose.connect("mongodb://mongo:27017/uploadly", { useNewUrlParser: true,useUnifiedTopology: true },(err) => {
    err ? console.log(err) : console.log("Mongodb database connected");
  });
});
