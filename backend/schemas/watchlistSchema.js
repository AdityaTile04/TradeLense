const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  percent: {
    type: String,
    required: true,
  },
  isDown: {
    type: String,
    required: true,
  },
});

module.exports = watchlistSchema;
