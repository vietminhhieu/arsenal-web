const express = require("express");
const router = express.Router();
const CategoryModel = require("./model/CategoryModel");
const CategoryRepository = require("./repositories/CategoryRepository");

//Lấy ra tất cả các category từ CSDL
router.get("/", async (req, res) => {
  try {
    const result = await CategoryRepository.findAllCategory();
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

//Thêm 1 category vào CSDL
router.post("/", async (req, res) => {
  const category = new CategoryModel({
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.json(newCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

//Lấy ra 1 category từ CSDL
router.get("/:categoryId", async (req, res) => {
  try {
    const getCategoryById = await CategoryModel.findById(req.params.categoryId);
    res.json(getCategoryById);
  } catch (err) {
    res.json({ message: err });
  }
});

//Xóa 1 bài post từ CSDL
router.delete("/:categoryId", async (req, res) => {
  try {
    const removeCategory = await CategoryModel.remove({
      _id: req.params.categoryId,
    });
    res.json("Xóa danh mục thành công");
  } catch (err) {
    res.json({ message: err });
  }
});

//Sửa 1 bài post từ CSDL
router.patch("/:categoryId", async (req, res) => {
  try {
    const updateCategory = await CategoryModel.updateOne(
      { _id: req.params.categoryId },
      { $set: { name: req.body.name } }
    );
    res.json("Sửa danh mục thành công");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
