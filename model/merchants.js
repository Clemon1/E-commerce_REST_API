const mongoose = require("mongoose");

const merchantsSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique: true,
      required: true,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: String,
    Desc: String,
    Image: String,
    otherImages: [],
    Password: {
      type: String,
      min: 8,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const merchants = mongoose.model("merchants", merchantsSchema);

module.exports = merchants;
