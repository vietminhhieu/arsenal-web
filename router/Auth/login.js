require("dotenv");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpResponseCode = require("../../common/constants");
const env = require("../../config/env");

const login = async (req, res) => {
  console.log(req.body);

  //VARIABLE USED
  const email = req.body.email;
  const password = req.body.password;

  try {
    //CHECKING IF THE EMAIL EXISTS
    const user = await User.findOne({ email });
    //   console.log("user: ", user);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email is not found" });

    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(password, user.password);
    //   console.log("validPass: ", validPass);
    if (!validPass)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    //CREATE TOKEN
    const loginToken = await jwt.sign({ _id: user._id }, env.secret_token);
    //   console.log("loginToken: ", loginToken);

    res.status(200).json({ success: true, data: { loginToken, user } });
  } catch (error) {
    res.status(500).json({ success: false, message: httpResponseCode[500] });
  }
};

module.exports = login;
