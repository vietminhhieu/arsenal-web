const router = require("express").Router();
const ProductController = require("./controller/productController");

router.post("/getCategoryId", ProductController.getCategoryIdFromController);
router.get("/", ProductController.getAllProductFromDatabase);
router.get("/:productId", ProductController.getOneProductFromDatabase);
router.post("/", ProductController.addOneProductToDatabase);
router.patch("/:productId", ProductController.updateOneProductFromDatabase);
router.delete("/:productId", ProductController.deleteOneProductFromDatabase);
router.delete("/", ProductController.deleteAllProductFromDatabase);
module.exports = router;
