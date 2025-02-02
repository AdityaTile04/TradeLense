const mongoose = require("mongoose");

const positionsSchema = require("../schemas/positionSchema");

const Position = mongoose.model("Position", positionsSchema);

module.exports = Position;
