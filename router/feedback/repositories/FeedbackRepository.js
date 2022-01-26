const FeedbackModel = require("../model/FeedbackModel");

class FeedbackRepository {
  findAllFeedback = async () => {
    return await FeedbackModel.find({});
  };

  findOneFeedback = async (feedbackId) => {
    return await FeedbackModel.findById(feedbackId);
  };

  addRecordFeedback = async (
    id_product,
    customerName,
    avatar,
    submitTime,
    rating,
    feedbackContent
  ) => {
    return await FeedbackModel(
      id_product,
      customerName,
      avatar,
      submitTime,
      rating,
      feedbackContent
    ).save();
  };

  updateRecordFeedback = async (
    feedbackId,
    customerName,
    avatar,
    submitTime,
    rating,
    feedbackContent
  ) => {
    return await FeedbackModel.updateOne(
      feedbackId,
      customerName,
      avatar,
      submitTime,
      rating,
      feedbackContent
    );
  };

  deleteAllFeedback = async () => {
    return await FeedbackModel.deleteMany();
  };

  deleteOneFeedback = async (feedbackId) => {
    return await FeedbackModel.deleteOne({ feedbackId });
  };
}

module.exports = new FeedbackRepository();
