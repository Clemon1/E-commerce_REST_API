const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const productShema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discountPrice: Number,
    rating: Number,
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    brand: String,
    image: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const products = mongoose.model("products", productShema);

module.exports = products;
