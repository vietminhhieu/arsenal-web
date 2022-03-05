const User = require("../../model/User");

const personalInfo = async (req, res) => {
  // console.log("req.body", req.body);
  // console.log("req.params", req.params);
  //VARIABLE USED
  const {
    firstName,
    lastName,
    avatar,
    sex,
    dateBirth,
    phoneNumber,
    houseNumber,
    wards,
    district,
    city,
  } = req.body;

  const { id } = req.params;

  try {
    const updatePersonalInfo = {
      firstName,
      lastName,
      avatar,
      sex,
      dateBirth,
      phoneNumber,
      houseNumber,
      wards,
      district,
      city,
    };

    const user = await User.findByIdAndUpdate({ _id: id }, updatePersonalInfo, {
      new: true,
    });
    // console.log("user", user);

    res.status(200).send({
      success: true,
      message: "Bạn đã cập nhật thông tin thành công",
      data: { user },
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = personalInfo;
