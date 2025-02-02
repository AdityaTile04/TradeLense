const mongoose = require("mongoose");

const holdingSchema = require("../schemas/HoldingSchema");

const HoldingsModel = mongoose.model("Holdings", holdingSchema);

module.exports = HoldingsModel;
