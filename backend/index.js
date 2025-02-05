const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const HoldingsModel = require("./model/holding.model");
const Position = require("./model/position.model");

const app = express();

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await Position.find({});
  res.json(allPositions);
});

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
connection()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Error while connecting database ${err}`));
