const CategoryService = require("../services/CategoryServices");
const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryController extends CategoryService {
  //Lấy ra tất cả các category từ CSDL
  getAllCategoryFromDatabase = async (req, res) => {
    try {
      const result = await CategoryRepository.findAllCategory();
      res.json(result);
    } catch (err) {
      res.json({ message: err });
    }
  };

  //Lấy ra 1 category từ CSDL
  getOneCategoryFromDatabase = async (req, res) => {
    try {
      const getCategoryById = await CategoryRepository.findOneCategory(
        req.params.categoryId
      );
      res.json(getCategoryById);
    } catch (err) {
      res.json({ message: err });
    }
  };

  //Thêm 1 category vào CSDL
  addOneCategoryToDatabase = async (req, res) => {
    try {
      // const category = await new CategoryModel({ name: req.body.name }).save();
      const category = await CategoryRepository.addRecordCategory({
        name: req.body.name,
      });

      // const newCategory = await category.save();
      res.json(category);
    } catch (err) {
      res.json({ message: err });
    }
  };

  //Xóa 1 bài post từ CSDL
  deleteOneCategoryFromDatabase = async (req, res) => {
    try {
      const removeCategory = await CategoryRepository.deleteRecordCategory({
        _id: req.params.categoryId,
      });
      res.send("Xóa danh mục thành công");
    } catch (err) {
      res.json({ message: err });
    }
  };

  //Sửa 1 bài post từ CSDL
  updateOneCategoryFromDatabase = async (req, res) => {
    try {
      const updateCategory = await CategoryRepository.updateRecordCategory(
        { _id: req.params.categoryId },
        { $set: { name: req.body.name } }
      );

      res.send("Sửa danh mục thành công");
    } catch (err) {
      res.json({ message: err });
    }
  };
}

module.exports = new CategoryController();
