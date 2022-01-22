const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
  id_category: {
    type: type.String,
    require: true,
  },
  name: {
    type: type.String,
    require: true,
  },
  thumbnail: {
    type: type.Array,
    require: true,
  },
  color: {
    type: type.Array,
    require: true,
  },
  capacity: {
    type: type.Array,
    require: true,
  },
  price: {
    type: type.Array,
    require: true,
  },
  promotion: {
    type: type.Array,
    require: true,
  },
  category: {
    type: type.String,
    require: true,
  },
  description: {
    type: type.Array,
    require: true,
  },
  visited: {
    type: type.Number,
    default: Math.random() * 1000,
  },
  created_at: {
    type: type.Date,
    default: new Date(),
  },
  updated_at: {
    type: type.Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("ProductModel", productSchema);
