const router = require("express").Router();
const CommentController = require("./controller/CommentController");

router.post("/getProductId", CommentController.getProductIdFromProductTable);
router.get("/", CommentController.getAllCommentFromDatabase);
router.get("/:commentId", CommentController.getOneCommentFromDatabase);
router.post("/", CommentController.addOneCommentToDatabase);
router.patch("/:commentId", CommentController.updateOneCommentFromDatabase);
router.delete("/", CommentController.deleteAllCommentFromDatabase);
router.delete("/:commentId", CommentController.deleteOneCommentFromDatabase);

module.exports = router;
