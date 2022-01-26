const CommentModel = require("../model/CommentModel");

class CommentRepository {
  findAllComment = async () => {
    return await CommentModel.find({});
  };

  findOneComment = async (commentID) => {
    return await CommentModel.findById(commentID);
  };

  addRecordComment = async (
    id_product,
    customerName,
    customerAvatar,
    commentContent,
    commentTime,
    adminName,
    adminAvatar,
    response
  ) => {
    return await CommentModel(
      id_product,
      customerName,
      customerAvatar,
      commentContent,
      commentTime,
      adminName,
      adminAvatar,
      response
    ).save();
  };

  updateRecordComment = async (
    commentID,
    customerName,
    customerAvatar,
    commentContent,
    commentTime,
    adminName,
    adminAvatar,
    response
  ) => {
    return await CommentModel.updateOne(
      commentID,
      customerName,
      customerAvatar,
      commentContent,
      commentTime,
      adminName,
      adminAvatar,
      response
    );
  };

  deleteAllComment = async () => {
    return await CommentModel.deleteMany();
  };

  deleteOneComment = async (commentID) => {
    return await CommentModel.deleteOne({ commentID });
  };
}

module.exports = new CommentRepository();
