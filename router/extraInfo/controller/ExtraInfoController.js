const ExtraInfoService = require("../services/ExtraInfoService");
const InternalServerError = require("../../../errors/InternalServerError");
const ProductRepository = require("../../product/repositories/ProductRepository");
const ExtraInfoRepository = require("../repositories/ExtraInfoRepository");

class ExtraInfoController extends ExtraInfoService {
  getProductIdFromProductTable = async (req, res) => {
    try {
      const productId = await ProductRepository.getProductId(
        req.body.productName
      );
      res.json({ productID: productId._id });
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  getAllInformationFromDatabase = async (req, res) => {
    try {
      const informations = await ExtraInfoRepository.findAllInfo();
      res.json(informations);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  getOneInformationFromDatabase = async (req, res) => {
    try {
      const information = await ExtraInfoRepository.findOneInfo(
        req.params.infoId
      );
      res.json(information);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  addOneInformationToDatabase = async (req, res) => {
    try {
      const productId = await ProductRepository.getProductId(
        req.body.productName
      );
      const newExtraInfo = await ExtraInfoRepository.addRecordInfo({
        id_product: productId._id,
        screenTechnology: req.body.screenTechnology,
        resolution: req.body.resolution,
        screenSize: req.body.screenSize,
        backCamera: req.body.backCamera,
        video: req.body.video,
        frontCamera: req.body.frontCamera,
        operatingSystem: req.body.operatingSystem,
        chip: req.body.chip,
        cpu: req.body.cpu,
        gpu: req.body.gpu,
        ram: req.body.ram,
        internalMemory: req.body.internalMemory,
        sim: req.body.sim,
        wifi: req.body.wifi,
        gps: req.body.gps,
        bluetooth: req.body.bluetooth,
        size: req.body.size,
        weight: req.body.weight,
        batteryCapacity: req.body.batteryCapacity,
        batteryType: req.body.batteryType,
      });
      res.json(newExtraInfo);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  updateOneInformationFromDatabase = async (req, res) => {
    try {
      const updateInfo = await ExtraInfoRepository.updateRecordInfo(
        { _id: req.params.infoId },
        {
          $set: {
            screenTechnology: req.body.screenTechnology,
            resolution: req.body.resolution,
            screenSize: req.body.screenSize,
            backCamera: req.body.backCamera,
            video: req.body.video,
            frontCamera: req.body.frontCamera,
            operatingSystem: req.body.operatingSystem,
            chip: req.body.chip,
            cpu: req.body.cpu,
            gpu: req.body.gpu,
            ram: req.body.ram,
            internalMemory: req.body.internalMemory,
            sim: req.body.sim,
            wifi: req.body.wifi,
            gps: req.body.gps,
            bluetooth: req.body.bluetooth,
            size: req.body.size,
            weight: req.body.weight,
            batteryCapacity: req.body.batteryCapacity,
            batteryType: req.body.batteryType,
          },
        }
      );
      res.json("Cập nhật thông tin thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  deleteAllInformationFromDatabase = async (req, res) => {
    try {
      const deleteAllInfo = await ExtraInfoRepository.deleteAllInfo();
      res.json("Xóa tất cả thông tin thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  deleteOneInformationFromDatabase = async (req, res) => {
    try {
      const deleteOneInfo = await ExtraInfoRepository.deleteOneInfo(
        req.params.infoId
      );
      res.json("Xóa thông tin thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };
}

module.exports = new ExtraInfoController();
