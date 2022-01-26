const router = require("express").Router();
const ExtraInfoController = require("./controller/ExtraInfoController");

router.post("/getProductId", ExtraInfoController.getProductIdFromProductTable);
router.get("/", ExtraInfoController.getAllInformationFromDatabase);
router.get("/:infoId", ExtraInfoController.getOneInformationFromDatabase);
router.post("/", ExtraInfoController.addOneInformationToDatabase);
router.patch("/:infoId", ExtraInfoController.updateOneInformationFromDatabase);
router.delete("/", ExtraInfoController.deleteAllInformationFromDatabase);
router.delete("/:infoId", ExtraInfoController.deleteOneInformationFromDatabase);

module.exports = router;
