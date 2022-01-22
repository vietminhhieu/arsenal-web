const CategoryModel = require("../model/CategoryModel");

class CategoryRepository {
  findAllCategory = async () => {
    return await CategoryModel.find();
  };

  findOneCategory = async (cateId) => {
    return await CategoryModel.findById(cateId);
  };

  addRecordCategory = async (cateName) => {
    return await new CategoryModel(cateName).save();
  };

  deleteRecordCategory = async (cateId) => {
    console.log(cateId);
    return await CategoryModel.remove(cateId);
  };

  updateRecordCategory = async (cateId, name) => {
    return await CategoryModel.updateOne(cateId, name);
  };

  //Quang làm: dùng cho product
  findCategoryDetailByName = async (name) => {
    return CategoryModel.findOne({ name });
  };
}

module.exports = new CategoryRepository();
