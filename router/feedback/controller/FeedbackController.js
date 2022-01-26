const InternalServerError = require("../../../errors/InternalServerError");
const ProductRepository = require("../../product/repositories/ProductRepository");
const FeedbackRepository = require("../repositories/FeedbackRepository");
const FeedbackService = require("../services/FeedbackService");

class FeedbackController extends FeedbackService {
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

  getAllFeedbackFromDatabase = async (req, res) => {
    try {
      const feedbacks = await FeedbackRepository.findAllFeedback();
      res.json(feedbacks);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  getOneFeedbackFromDatabase = async (req, res) => {
    try {
      const feedback = await FeedbackRepository.findOneFeedback(
        req.params.feedbackId
      );
      res.json(feedback);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  addOneFeedbackToDatabase = async (req, res) => {
    try {
      const productId = await ProductRepository.getProductId(
        req.body.productName
      );
      const newFeedback = await FeedbackRepository.addRecordFeedback({
        id_product: productId._id,
        customerName: req.body.customerName,
        avatar: req.body.avatar,
        submitTime: req.body.submitTime,
        rating: req.body.rating,
        feedbackContent: req.body.feedbackContent,
      });
      res.json(newFeedback);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  updateOneFeedbackFromDatabase = async (req, res) => {
    try {
      const updateFeedback = await FeedbackRepository.updateRecordFeedback(
        { _id: req.params.feedbackId },
        {
          $set: {
            customerName: req.body.customerName,
            avatar: req.body.avatar,
            submitTime: req.body.submitTime,
            rating: req.body.rating,
            feedbackContent: req.body.feedbackContent,
          },
        }
      );
      res.json("Cập nhật đánh giá thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  deleteAllFeedbackFromDatabase = async (req, res) => {
    try {
      const deleteAllFeedback = await FeedbackRepository.deleteAllFeedback();
      res.json("Xóa tất cả đánh giá thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  deleteOneFeedbackFromDatabase = async (req, res) => {
    try {
      const deleteOneFeedback = await FeedbackRepository.deleteOneFeedback(
        req.params.feedbackId
      );
      res.json("Xóa đánh giá thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };
}

module.exports = new FeedbackController();
