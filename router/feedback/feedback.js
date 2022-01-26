const router = require("express").Router();
const FeedbackController = require("./controller/FeedbackController");

router.post("/getProductId", FeedbackController.getProductIdFromProductTable);
router.get("/", FeedbackController.getAllFeedbackFromDatabase);
router.get("/:feedbackId", FeedbackController.getOneFeedbackFromDatabase);
router.post("/", FeedbackController.addOneFeedbackToDatabase);
router.patch("/:feedbackId", FeedbackController.updateOneFeedbackFromDatabase);
router.delete("/", FeedbackController.deleteAllFeedbackFromDatabase);
router.delete("/:feedbackId", FeedbackController.deleteOneFeedbackFromDatabase);

module.exports = router;
