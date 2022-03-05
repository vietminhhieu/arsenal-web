const User = require("../../model/User");
const httpResponseCode = require("../../common/constants");

const changeAvatar = async (req, res) => {
  //   console.log("req.body", req.body);
  //   console.log("req.params", req.params);
  const { newAvatar } = req.body;
  const { id } = req.params;

  try {
    //CẬP NHẬT AVATAR MỚI
    const updateAvatar = {
      avatar: newAvatar,
    };
    const user = await User.findByIdAndUpdate({ _id: id }, updateAvatar, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Bạn đã thay đổi ảnh đại diện thành công",
      data: { user },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: httpResponseCode[500] });
  }
};

module.exports = changeAvatar;
