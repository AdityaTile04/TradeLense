const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
connection()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Error while connecting database ${err}`));
