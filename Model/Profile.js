const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    photo: {
      type: [""],
    },

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    skills: {
      type: [""],
      required: true,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
    alt_address: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    country: {
      type: [""],
      required: true,
      default: false,
    },
    landmark: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("profile", ProfileSchema);
