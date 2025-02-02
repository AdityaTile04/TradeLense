const mongoose = require("mongoose");
const OrderSchema = require("../schemas/orderSchema");

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
