const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const extraInfoSchema = mongoose.Schema({
  screenSize: {
    type: type.String,
    require: true,
  },
  screenTechnology: {
    type: type.String,
    require: true,
  },
  resolution: {
    type: type.String,
    require: true,
  },
  frontCamera: {
    type: type.String,
    require: true,
  },
  backCamera: {
    type: type.Array,
    require: true,
  },
  video: {
    type: type.Array,
    require: true,
  },
  chip: {
    type: type.String,
    require: true,
  },
  ram: {
    type: type.String,
    require: true,
  },
  battery: {
    type: type.String,
    require: true,
  },
  chargeTechnology: {
    type: type.Array,
    require: true,
  },
  chargePort: {
    type: type.String,
    require: true,
  },
  sim: {
    type: type.String,
    require: true,
  },
  operatingSystem: {
    type: type.String,
    require: true,
  },
  size: {
    type: type.String,
    require: true,
  },
  weight: {
    type: type.String,
    require: true,
  },
  backMaterial: {
    type: type.String,
    require: true,
  },
  borderMaterial: {
    type: type.String,
    require: true,
  },
});

module.exports = mongoose.model("ExtraInfoModel", extraInfoSchema);
