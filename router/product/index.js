const {
  default: InternalServerError,
} = require("../../errors/InternalServerError");
const ProductController = require("./controller/productController");

const router = require("express").Router();

router.get("/test", ProductController.testFunction);

module.exports = router;
