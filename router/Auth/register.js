require("dotenv/config");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const httpResponseCode = require("../../common/constants");

const register_uConfirm = async (req, res) => {
  //CÁC BIẾN CẦN SỬ DỤNG
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  //KIỂM TRA XEM EMAIL ĐÃ TỒN TẠI TRONG DB CHƯA
  const existedEmail = await User.findOne({ email });
  if (existedEmail)
    return res
      .status(400)
      .send({ success: false, message: "Email has already existed" });

  //MÃ HÓA MẬT KHẨU
  const salt = await bcrypt.genSalt(10);
  const hashPW = await bcrypt.hash(password, salt);

  //TẠO 1 TOKEN
  const registerToken = jwt.sign({ email, hashPW }, process.env.SECRET_TOKEN);
  console.log("registerToken: ", registerToken);

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
        user: process.env.ARS_EMAIL,
        pass: process.env.ARS_PASSWORD,
      },
    });

    //BƯỚC 2
    let mailOption = {
      from: process.env.ARS_EMAIL,
      to: email,
      subject: "Register Account",
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
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
                <h2>Email Address Verification</h2>
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
              <td>
                <h3>Congratulations! You're almost set to start using Cloudinary.
                Just click the button below to validate your email address.</h3>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `,
    };

    //BƯỚC 3
    transporter.sendMail(mailOption, async (err, data) => {
      if (err) {
        console.log("Error when send mail: ", err);
      } else {
        console.log("Email have sent!");
        await user.save();
        res.status(200).send({
          success: true,
          message: "You have created account successfully",
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
    const registerConfirmToken = jwt.verify(
      req.params.token,
      process.env.SECRET_TOKEN
    );
    console.log(registerConfirmToken);

    // CÁC BIẾN CẦN SỬ DỤNG
    const email = registerConfirmToken.email;
    const password = registerConfirmToken.password;

    //UPDATE DB
    const updateRegister = {
      email: email,
      password: password,
      isAdmin: false,
      isConfirm: true,
    };

    await User.findOneAndUpdate({ email }, updateRegister, { new: true });

    res.json({ success: true, message: "Your account have activated" });
  } catch (err) {
    res.status(500).json({ success: false, message: httpResponseCode[500] });
  }
};

module.exports = { register_uConfirm, register_confirm };
