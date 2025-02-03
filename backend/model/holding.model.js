const mongoose = require("mongoose");

const holdingSchema = require("../schemas/holdingSchema");

const HoldingsModel = mongoose.model("Holdings", holdingSchema);

module.exports = HoldingsModel;
