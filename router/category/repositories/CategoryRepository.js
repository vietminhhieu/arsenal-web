const CategoryModel = require("../model/CategoryModel");

class CategoryRepository {
  findAllCategory = async () => {
    return await CategoryModel.find();
  };

  findOneCategory = async (categoryId) => {
    return await CategoryModel.findById(categoryId);
  };

  addRecordCategory = async (categoryName) => {
    return await new CategoryModel(categoryName).save();
  };

  deleteRecordCategory = async (categoryId) => {
    return await CategoryModel.deleteOne(categoryId);
  };

  deleteAllCategory = async () => {
    return await CategoryModel.remove();
  };

  updateRecordCategory = async (categoryId, name) => {
    return await CategoryModel.updateOne(categoryId, name);
  };

  //Sử dụng để lấy ra categoryID
  getCategoryIdFromCategory = async (categoryName) => {
    return await CategoryModel.findOne({ name: categoryName });
  };
}

module.exports = new CategoryRepository();
