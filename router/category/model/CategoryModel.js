const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const categorySchema = mongoose.Schema({
  name: {
    type: type.String,
    require: true,
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

module.exports = mongoose.model("CategoryModel", categorySchema);
