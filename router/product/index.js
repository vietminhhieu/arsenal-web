const {
  default: InternalServerError,
} = require("../../errors/InternalServerError");

const router = require("express").Router();

router.get("/test", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
