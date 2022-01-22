const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
  id_product: {
    type: type.String,
    require: true,
  },
  customerName: {
    type: type.Array,
    require: true,
  },
  customerAvatar: {
    type: type.String,
    require: true,
  },
  commentContent: {
    type: type.Array,
    require: true,
  },
  commentTime: {
    type: type.Array,
    require: true,
  },
  adminName: {
    type: type.String,
    require: true,
  },
  adminAvatar: {
    type: type.String,
    require: true,
  },
  response: {
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

module.exports = mongoose.model("CommentModel", commentSchema);
