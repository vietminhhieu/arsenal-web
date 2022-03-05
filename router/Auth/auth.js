const router = require("express").Router();
const login = require("./login");
const { register_uConfirm, register_confirm } = require("./register");
const { forgetPW_uConfirm, forgetPW_Confirm } = require("./forgetPW");
const personalInfo = require("./personalInfo");
const changePassword = require("./changePW");
const changeAvatar = require("./changeAvatar");

router.post("/register", register_uConfirm);
router.post("/register/:token", register_confirm);

router.post("/login", login);

router.post("/forget-password", forgetPW_uConfirm);
router.post("/forget-password/:token", forgetPW_Confirm);

router.post("/information/:id", personalInfo);
router.post("/change-password/:id", changePassword);
router.post("/change-avatar/:id", changeAvatar);

module.exports = router;
