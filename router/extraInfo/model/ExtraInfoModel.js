const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const extraInfoSchema = mongoose.Schema({
  id_product: {
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
  screenSize: {
    type: type.String,
    require: true,
  },
  backCamera: {
    type: type.String,
    require: true,
  },
  video: {
    type: type.String,
    require: true,
  },
  frontCamera: {
    type: type.String,
    require: true,
  },
  operatingSystem: {
    type: type.String,
    require: true,
  },
  chip: {
    type: type.String,
    require: true,
  },
  cpu: {
    type: type.String,
    require: true,
  },
  gpu: {
    type: type.String,
    require: true,
  },
  ram: {
    type: type.String,
    require: true,
  },
  internalMemory: {
    type: type.String,
    require: true,
  },
  sim: {
    type: type.String,
    require: true,
  },
  wifi: {
    type: type.String,
    require: true,
  },
  gps: {
    type: type.String,
    require: true,
  },
  bluetooth: {
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
  batteryCapacity: {
    type: type.String,
    require: true,
  },
  batteryType: {
    type: type.String,
    require: true,
  },
});

module.exports = mongoose.model("ExtraInfoModel", extraInfoSchema);
