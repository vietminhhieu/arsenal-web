const CategoryService = require("../services/CategoryServices");
const CategoryRepository = require("../repositories/CategoryRepository");
const InternalServerError = require("../../../errors/InternalServerError");

class CategoryController extends CategoryService {
  //Lấy ra tất cả các category từ CSDL
  getAllCategoryFromDatabase = async (req, res) => {
    try {
      const categories = await CategoryRepository.findAllCategory();
      res.json(categories);
    } catch (err) {
      res.json(new InternalServerError(error));
    }
  };

  //Lấy ra 1 category từ CSDL
  getOneCategoryFromDatabase = async (req, res) => {
    try {
      const category = await CategoryRepository.findOneCategory(
        req.params.categoryId
      );
      res.json(category);
    } catch (err) {
      res.json(new InternalServerError(error));
    }
  };

  //Thêm 1 category vào CSDL
  addOneCategoryToDatabase = async (req, res) => {
    try {
      const newCategory = await CategoryRepository.addRecordCategory({
        name: req.body.name,
      });
      res.json(newCategory);
    } catch (err) {
      res.json(new InternalServerError(error));
    }
  };

  //Sửa 1 bản ghi category từ CSDL
  updateOneCategoryFromDatabase = async (req, res) => {
    try {
      const updateCategory = await CategoryRepository.updateRecordCategory(
        { _id: req.params.categoryId },
        { $set: { name: req.body.name } }
      );

      res.send("Sửa danh mục thành công");
    } catch (err) {
      res.json(new InternalServerError(error));
    }
  };

  //Xóa 1 bản ghi category từ CSDL
  deleteOneCategoryFromDatabase = async (req, res) => {
    try {
      const removeCategory = await CategoryRepository.deleteRecordCategory({
        _id: req.params.categoryId,
      });
      res.send("Xóa danh mục thành công");
    } catch (err) {
      res.json(new InternalServerError(error));
    }
  };

  //Xóa tất cả bản ghi category từ CSDL
  deleteAllCategoryFromDatabase = async (req, res) => {
    try {
      const deleteAllCategory = await CategoryRepository.deleteAllCategory();
      res.json("Xóa tất cả các danh mục thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };
}

module.exports = new CategoryController();
