const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  avatar: {
    type: String,
    default:
      "https://www.ihep.org/wp-content/themes/ihep-theme/assets/images/user-profile.jpg",
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  sex: {
    type: String,
    default: "",
  },
  dateBirth: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  houseNumber: {
    type: String,
    default: "",
  },
  wards: {
    type: String,
    default: "",
  },
  district: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
