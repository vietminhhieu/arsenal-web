const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
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
    require: true,
  },
});

module.exports = mongoose.model("ProductModel", productSchema);
