const mongoose = require("mongoose");
const watchlistSchema = require("../schemas/watchlistSchema");

const Watchlist = mongoose.model("watchlist", watchlistSchema);

module.exports = Watchlist;
