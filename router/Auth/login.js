const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpResponseCode = require("../../common/constants");
const env = require("../../config/env");

const login = async (req, res) => {
  // console.log(req.body);

  //VARIABLE USED
  const { email, password } = req.body;

  try {
    //CHECKING IF THE EMAIL EXISTS
    const user = await User.findOne({ email });
    //   console.log("user: ", user);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Email không tồn tại. Vui lòng nhập lại email!",
      });

    //CHECKING PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(password, user.password);
    //   console.log("validPass: ", validPass);
    if (!validPass)
      return res.status(400).json({
        success: false,
        message: "Nhập sai mật khẩu. Vui lòng nhập lại mật khẩu!",
      });

    //CHECK ACCOUNT ACTIVE
    const activeAccount = await User.findOne({ email });
    const accountIsConfirm = activeAccount.isConfirm;
    // console.log("accountIsConfirm", accountIsConfirm);
    if (!accountIsConfirm)
      return res.status(400).json({
        success: false,
        message:
          "Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email của bạn (có thể trong thư rác) để kích hoạt tài khoản!",
      });

    //CREATE TOKEN
    const loginToken = await jwt.sign({ _id: user._id }, env.secret_token);
    //   console.log("loginToken: ", loginToken);

    res.status(200).json({ success: true, data: { loginToken, user } });
  } catch (error) {
    res.status(500).json({ success: false, message: httpResponseCode[500] });
  }
};

module.exports = login;
