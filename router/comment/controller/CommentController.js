const CommentService = require("../services/CommentService");
const InternalServerError = require("../../../errors/InternalServerError");
const ProductRepository = require("../../product/repositories/ProductRepository");
const CommentRepository = require("../repositories/CommentRepository");

class CommentController extends CommentService {
  getProductIdFromProductTable = async (req, res) => {
    try {
      const productId = await ProductRepository.getProductId(
        req.body.productName
      );
      //   res.json(productId);
      res.json({ productID: productId._id });
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  getAllCommentFromDatabase = async (req, res) => {
    try {
      const comments = await CommentRepository.findAllComment();
      res.json(comments);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  getOneCommentFromDatabase = async (req, res) => {
    try {
      const comment = await CommentRepository.findOneComment(
        req.params.commentId
      );
      res.json(comment);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  addOneCommentToDatabase = async (req, res) => {
    try {
      const productId = await ProductRepository.getProductId(
        req.body.productName
      );
      const newComment = await CommentRepository.addRecordComment({
        id_product: productId._id,
        customerName: req.body.customerName,
        customerAvatar: req.body.customerAvatar,
        commentContent: req.body.commentContent,
        commentTime: req.body.commentTime,
        adminName: req.body.adminName,
        adminAvatar: req.body.adminAvatar,
        response: req.body.response,
      });
      res.json(newComment);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  updateOneCommentFromDatabase = async (req, res) => {
    try {
      const updateComment = await CommentRepository.updateRecordComment(
        { _id: req.params.commentId },
        {
          $set: {
            customerName: req.body.customerName,
            customerAvatar: req.body.customerAvatar,
            commentContent: req.body.commentContent,
            commentTime: req.body.commentTime,
            adminName: req.body.adminName,
            adminAvatar: req.body.adminAvatar,
            response: req.body.response,
          },
        }
      );
      res.json("Cập nhật bình luận thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  deleteAllCommentFromDatabase = async (req, res) => {
    try {
      const deleteAllComment = await CommentRepository.deleteAllComment();
      res.json("Xóa tất cả bình luận thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  deleteOneCommentFromDatabase = async (req, res) => {
    try {
      const deleteOneComment = await CommentRepository.deleteOneComment(
        req.params.commentId
      );
      res.json("Xóa bình luận thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };
}

module.exports = new CommentController();
