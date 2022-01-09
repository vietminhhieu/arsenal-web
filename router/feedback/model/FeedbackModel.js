const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const feedbackSchema = mongoose.Schema({
  customerName: {
    type: type.String,
    require: true,
  },
  avatar: {
    type: type.String,
    require: true,
  },
  submitTime: {
    type: type.Date,
    require: true,
  },
  rating: {
    type: type.Number,
    require: true,
  },
  feedbackContent: {
    type: type.String,
    require: true,
  },
});

module.exports = mongoose.model("FeedbackModel", feedbackSchema);
