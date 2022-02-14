require("dotenv/config");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const httpResponseCode = require("../../common/constants");
const env = require("../../config/env");

const register_uConfirm = async (req, res) => {
  //CÁC BIẾN CẦN SỬ DỤNG
  const { firstName, lastName, email, password } = req.body;

  //KIỂM TRA XEM EMAIL ĐÃ TỒN TẠI TRONG DB CHƯA
  const existedEmail = await User.findOne({ email });
  if (existedEmail)
    return res.status(400).json({
      success: false,
      message: "Email đã được sử dụng. Vui lòng dùng email khác!",
    });

  //MÃ HÓA MẬT KHẨU
  const salt = await bcrypt.genSalt(10);
  const hashPW = await bcrypt.hash(password, salt);

  //TẠO 1 TOKEN
  const registerToken = jwt.sign({ email, hashPW }, env.secret_token);
  // console.log("registerToken: ", registerToken);

  //TẠO MỘT TÀI KHOẢN
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPW,
    isAdmin: false,
    isConfirm: false,
  });

  //GỬI MẪU THƯ XÁC NHẬN CỦA USER
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
      subject: "Xác nhận đăng ký tài khoản",
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
          <h2>Xác thực địa chỉ email</h2>
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
            Chúc mừng ${email}! Bạn chỉ còn một vài bước nữa để tài khoản của mình. 
            Click vào nút bên dưới để xác thực địa chỉ email của bạn
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
            href="http://localhost:3000/sign-up/success/${registerToken}"
            >
            Kích hoạt tài khoản
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
        console.log("Lỗi khi gửi email: ", err);
      } else {
        console.log("Email đã được gửi!");
        await user.save();
        res.status(200).send({
          success: true,
          message:
            "Bạn đã tạo tài khoản thành công. Vui lòng sử dụng email của bạn để kích hoạt tài khoản (có thể nằm trong thư rác)",
        });
      }
    });
  } catch (err) {
    console.log("Error when save user: ", err);
  }
};

const register_confirm = async (req, res) => {
  try {
    //GIẢI MÃ
    const registerConfirmToken = jwt.verify(req.params.token, env.secret_token);
    // console.log("registerConfirmToken: ", registerConfirmToken);

    // CÁC BIẾN CẦN SỬ DỤNG
    const { email, hashPW } = registerConfirmToken;
    // console.log("email: ", email);
    // console.log("hashPW: ", hashPW);

    //UPDATE DB
    const updateRegister = {
      email: email,
      password: hashPW,
      isAdmin: false,
      isConfirm: true, //tài khoản đã kích hoạt
    };
    // console.log("updateRegister", updateRegister);

    await User.findOneAndUpdate({ email }, updateRegister, {
      new: true,
    });
    // console.log("user: ", user);

    res.json({ success: true, message: "Tài khoản của bạn đã được kích hoạt" });
  } catch (err) {
    console.log("err: ", err);

    res.status(500).json({ success: false, message: httpResponseCode[500] });
  }
};

module.exports = { register_uConfirm, register_confirm };
