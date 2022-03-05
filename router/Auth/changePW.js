const bcrypt = require("bcrypt");
const User = require("../../model/User");
const httpResponseCode = require("../../common/constants");

const changePassword = async (req, res) => {
  //   console.log("req.body", req.body);
  //   console.log("req.params", req.params);
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  try {
    // TÌM THÔNG TIN NGƯỜI DÙNG
    const user = await User.findOne({ _id: id });
    // console.log("user", user.password);

    //KIỂM TRA MẬT KHẨU CŨ CÓ KHỚP KHÔNG
    const validPass = await bcrypt.compare(oldPassword, user.password);
    // console.log("validPass: ", validPass);
    if (!validPass)
      return res.status(400).json({
        success: false,
        message: "Nhập sai mật khẩu cũ. Vui lòng nhập lại mật khẩu cũ!",
      });

    //MÃ HÓA MẬT KHẨU
    const salt = await bcrypt.genSalt(10);
    const hashPW = await bcrypt.hash(newPassword, salt);

    //CẬP NHẬT MẬT KHẨU MỚI
    const updatePass = {
      password: hashPW,
    };
    await User.findByIdAndUpdate({ _id: id }, updatePass, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Bạn đã thay đổi mật khẩu thành công" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: httpResponseCode[500] });
  }
};

module.exports = changePassword;
