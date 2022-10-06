const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },

    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    otherPhone: {
      type: String,
    },
    status: {
      type: string,
      enum: ["pending", "Succesful", "Failed"],
      default: "pendingd",
    },
  },
  {
    timestamps: true,
  },
);

const order = mongoose.model("orders", orderModel);

module.exports = order;
