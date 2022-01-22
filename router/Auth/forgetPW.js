require("dotenv");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const env = require("../../config/env");
const httpResponseCode = require("../../common/constants");

const forgetPW_uConfirm = async (req, res) => {
  //CÁC BIẾN SỬ DỤNG
  // console.log(req.body);
  const { email, password } = req.body;

  //KIỂM TRA XEM EMAIL CÓ TỒN TẠI K
  const existedEmail = await User.findOne({ email });
  if (!existedEmail)
    return res.status(400).json({
      success: false,
      message: "Không tồn tại email. Vui lòng nhập lại email!",
    });

  //MÃ HÓA MẬT KHẨU
  const salt = await bcrypt.genSalt(10);
  const hashPW = await bcrypt.hash(password, salt);

  //TẠO RA TOKEN
  const forgetPWToken = await jwt.sign({ email, hashPW }, env.secret_token);
  // console.log("forgetPWToken: ", forgetPWToken);

  //GỬI MẪU THƯ XÁC NHẬN CHO USER
  try {
    //BƯỚC 1
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.admin_email,
        pass: env.admin_password,
      },
    });

    //BƯỚC 2
    let mailOption = {
      from: env.admin_email,
      to: email,
      subject: "Lấy lại mật khẩu",
      text: "Bạn đã xác nhận thành công",
    };

    //BƯỚC 3
    transporter.sendMail(mailOption, async (err, data) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: httpResponseCode[500] });
      } else {
        console.log("Email đã được gửi thành công!");
      }
      res.status(200).json({
        success: true,
        message: "Thư đã được gửi đến email",
      });
    });
  } catch (err) {
    console.log("Error when save user: ", err);
  }
};

const forgetPW_Confirm = async (req, res) => {
  try {
    //GIÃI MÃ TOKEN
    const forgetPWConfirmToken = await jwt.verify(
      req.params.token,
      env.secret_token
    );

    //CÁC BIẾN CẦN SỬ DỤNG
    const { email, password } = forgetPWConfirmToken;

    //UPDATE DB
    const updateForgetPW = {
      email: email,
      password: password,
      isAdmin: false,
      isConfirm: true,
    };

    await User.findOneAndUpdate({ email }, updateForgetPW, { new: true });

    res.status(200).send({
      success: true,
      message: "Bạn đã thay đổi mật khẩu thành công",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: httpResponseCode[500] });
  }
};

module.exports = { forgetPW_uConfirm, forgetPW_Confirm };
