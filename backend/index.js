const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

const HoldingsModel = require("./model/holding.model");
const Position = require("./model/position.model");
const Order = require("./model/order.model");
const User = require("./model/user.model");
const { createSecretToken } = require("./utils/SecretToken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { userVerification } = require("./middleware/AuthMiddleware");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post("/", userVerification);

app.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ username, email, password, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (err) {
    console.log(err);
  }
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
