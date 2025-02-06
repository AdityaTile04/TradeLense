const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

const HoldingsModel = require("./model/holding.model");
const Position = require("./model/position.model");
const Order = require("./model/order.model");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await Position.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new Order({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();

  res.send("order saved!");
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
