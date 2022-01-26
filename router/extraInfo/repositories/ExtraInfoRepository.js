const ExtraInfoModel = require("../model/ExtraInfoModel");

class ExtraInfoRepository {
  findAllInfo = async () => {
    return await ExtraInfoModel.find({});
  };

  findOneInfo = async (infoID) => {
    return await ExtraInfoModel.findById(infoID);
  };

  addRecordInfo = async (
    id_product,
    screenTechnology,
    resolution,
    screenSize,
    backCamera,
    video,
    frontCamera,
    operatingSystem,
    chip,
    cpu,
    gpu,
    ram,
    internalMemory,
    sim,
    wifi,
    gps,
    bluetooth,
    size,
    weight,
    batteryCapacity,
    batteryType
  ) => {
    return await ExtraInfoModel(
      id_product,
      screenTechnology,
      resolution,
      screenSize,
      backCamera,
      video,
      frontCamera,
      operatingSystem,
      chip,
      cpu,
      gpu,
      ram,
      internalMemory,
      sim,
      wifi,
      gps,
      bluetooth,
      size,
      weight,
      batteryCapacity,
      batteryType
    ).save();
  };

  updateRecordInfo = async (
    infoID,
    screenTechnology,
    resolution,
    screenSize,
    backCamera,
    video,
    frontCamera,
    operatingSystem,
    chip,
    cpu,
    gpu,
    ram,
    internalMemory,
    sim,
    wifi,
    gps,
    bluetooth,
    size,
    weight,
    batteryCapacity,
    batteryType
  ) => {
    return await ExtraInfoModel.updateOne(
      infoID,
      screenTechnology,
      resolution,
      screenSize,
      backCamera,
      video,
      frontCamera,
      operatingSystem,
      chip,
      cpu,
      gpu,
      ram,
      internalMemory,
      sim,
      wifi,
      gps,
      bluetooth,
      size,
      weight,
      batteryCapacity,
      batteryType
    );
  };

  deleteAllInfo = async () => {
    return await ExtraInfoModel.deleteMany();
  };

  deleteOneInfo = async (infoID) => {
    return await ExtraInfoModel.deleteOne({ infoID });
  };
}

module.exports = new ExtraInfoRepository();
