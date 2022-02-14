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
  const { email } = req.body;

  //KIỂM TRA XEM EMAIL CÓ TỒN TẠI K
  const existedEmail = await User.findOne({ email });
  // console.log("existedEmail: ", existedEmail);
  if (!existedEmail)
    return res.status(400).json({
      success: false,
      message: "Không tồn tại email. Vui lòng nhập lại email!",
    });

  //CHECK ACCOUNT ACTIVE
  const activeAccount = await User.findOne({ email });
  const accountIsConfirm = activeAccount.isConfirm;
  // console.log("accountIsConfirm: ", accountIsConfirm);
  if (!accountIsConfirm)
    return res.status(400).json({
      success: false,
      message:
        "Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email của bạn (có thể trong thư rác) để kích hoạt tài khoản!",
    });

  const pwRecoveryToken = jwt.sign(
    {
      email,
    },
    env.secret_token
  );

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
      subject: "Khôi phục lại mật khẩu cho tài khoản",
      html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Poppins"
      rel="stylesheet"
    />
    <title>Document</title>
    <style>
      * {
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
      }
      h2 {
        color: #fff;
        text-align: center;
        padding: 1rem 0;
        font-weight: 400;
      }
      h3 {
        color: #000;
        padding: 0.5rem 1rem;
        text-align: justify;
        font-size: 1rem;
        margin: 0.25rem 0 1.5rem;
      }
      a {
        color: #000;
        padding-inline: 0;
      }
    </style>
  </head>
  <body>
    <table
      align="center"
      border="1"
      cellpadding="0"
      cellspacing="0"
      width="600"
    >
      <tr>
        <td bgcolor="#f50057">
          <h2>Khôi phục lại mật khẩu cho tài khoản</h2>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#fff" style="padding: 40px 0 30px 0">
          <img
            src="https://res.cloudinary.com/duitozhul/image/upload/v1632886142/Backend_Ars/mail_register_ddnw2k.png"
            alt="Mail Register"
            width="300"
          />
        </td>
      </tr>
      <tr>
        <td align="center" style="padding-bottom: 1.5rem">
          <div
            style="margin-top: 0.5rem"
          >
            <img
              src="https://res.cloudinary.com/duitozhul/image/upload/v1639843038/Smartphone_Web_Frontend/Logo/logo-circle.jpg"
              alt="Mail Register"
              width="40"
              style="margin-right: 0.5rem"
            />
            <h4 style="padding: 0.5rem; color: #000">Hiếu Viết Store</h4>
          </div>
          <h3>
            Có vẻ bạn đã quên mật khẩu. Không sao, chúng tôi sẽ giúp bạn đặt mới 
            mật khẩu của tài khoản ${email}. Nếu bạn tiến hành đặt mới tài 
            khoản thì mọi thông tin của tài khoản sẽ được tạo mới
          </h3>
          <a
            style="margin-block: 3rem; 
            cursor: pointer; 
            color: white;
            text-decoration: none;
            background: #f50057;
            color: #fff;
            font-size: 18px;
            padding: 0.7rem 2rem;
            border-radius: 0.3rem;
            margin-top: 2rem;"
            href="http://localhost:3000/password-recovery/new-password/${pwRecoveryToken}"
            >
            Đặt mới tài khoản
          </a>
          <h4 style="margin-top: 2rem; color: #000">Trân trọng, đội ngũ Hiếu Viết Shop</h4>
        </td>
      </tr>
      <tr>
        <td></td>
      </tr>
    </table>
  </body>
</html>
      `,
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
        message:
          "Thư đã được gửi đến email của bạn. Vui lòng kiểm tra hòm thư của bạn (có thể nằm trong thư rác)",
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
    // console.log("forgetPWConfirmToken", forgetPWConfirmToken);

    //CÁC BIẾN CẦN SỬ DỤNG
    const { email } = forgetPWConfirmToken;
    // console.log("email", email);

    //MẬT KHẨU MỚI
    const { password } = req.body;
    // console.log("password", password);

    //MÃ HÓA MẬT KHẨU
    const salt = await bcrypt.genSalt(10);
    const hashPW = await bcrypt.hash(password, salt);

    //UPDATE DB
    const updateForgetPW = {
      email: email,
      password: hashPW,
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
