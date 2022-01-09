const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
  customerName: {
    type: type.String,
    require: true,
  },
  commentContent: {
    type: type.String,
    require: true,
  },
  commentTime: {
    type: type.Date,
    require: true,
  },
  adminName: {
    type: type.String,
    require: true,
  },
  response: {
    type: type.String,
    require: true,
  },
});

module.exports = mongoose.model("CommentModel", commentSchema);
