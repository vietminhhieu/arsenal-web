const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const feedbackSchema = mongoose.Schema({
  id_product: {
    type: type.String,
    require: true,
  },
  customerName: {
    type: type.Array,
    require: true,
  },
  avatar: {
    type: type.String,
    require: true,
  },
  submitTime: {
    type: type.Array,
    require: true,
  },
  rating: {
    type: type.Array,
    require: true,
  },
  feedbackContent: {
    type: type.Array,
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

module.exports = mongoose.model("FeedbackModel", feedbackSchema);
