const CategoryModel = require("../model/CategoryModel");

class CategoryRepository {
  findAllCategory = async () => {
    return await CategoryModel.find();
  };
}

module.exports = new CategoryRepository();
