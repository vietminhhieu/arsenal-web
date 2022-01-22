const HttpError = require("../../errors/httpError");
const InternalServerError = require("../../errors/InternalServerError");
const ProductController = require("./controller/productController");

const router = require("express").Router();

// router.get("/test", ProductController.testFunction);

router.get("/test", async (req, res) => {
  try {
    res.json(new InternalServerError());
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
