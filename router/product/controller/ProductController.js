const ProductService = require("../services/ProductService");
const InternalServerError = require("../../../errors/InternalServerError");
const CategoryRepository = require("../../category/repositories/CategoryRepository");
const ProductRepository = require("../repositories/ProductRepository");

class ProductController extends ProductService {
  getCategoryIdFromController = async (req, res) => {
    try {
      // const result = await CategoryRepository.getCategoryIdFromCategory(
      //   req.body.category
      // );
      // res.json(result._id);
      const result = await this.getCategoryIdFromService(req.body.category);
      res.json(result);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  //Lấy ra tất cả các product từ CSDL
  getAllProductFromDatabase = async (req, res) => {
    try {
      const products = await ProductRepository.findAllProduct();
      res.json(products);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  //Lấy ra 1 product từ CSDL
  getOneProductFromDatabase = async (req, res) => {
    try {
      const product = await ProductRepository.findOneProduct(
        req.params.productId
      );
      res.json(product);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  //Thêm 1 product vào CSDL
  addOneProductToDatabase = async (req, res) => {
    try {
      //lấy id category
      const getCategoryId = await CategoryRepository.getCategoryIdFromCategory(
        req.body.category
      );
      //Thêm 1 bản ghi sản phẩm mới
      const newProduct = await ProductRepository.addRecordProduct({
        id_category: getCategoryId._id,
        name: req.body.name,
        thumbnail: req.body.thumbnail,
        color: req.body.color,
        capacity: req.body.capacity,
        price: req.body.price,
        promotion: req.body.promotion,
        category: req.body.category,
        description: req.body.description,
        visited: req.body.visited,
      });
      res.json(newProduct);
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  //Sửa 1 bản ghi product từ CSDL
  updateOneProductFromDatabase = async (req, res) => {
    try {
      const updateProduct = await ProductRepository.updateRecordProduct(
        { _id: req.params.productId },
        {
          $set: {
            name: req.body.name,
            thumbnail: req.body.thumbnail,
            color: req.body.color,
            capacity: req.body.capacity,
            price: req.body.price,
            promotion: req.body.promotion,
            category: req.body.category,
            description: req.body.description,
            visited: req.body.visited,
          },
        }
      );
      res.json("Sửa sản phẩm thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  //Xóa 1 bản ghi product từ CSDL
  deleteOneProductFromDatabase = async (req, res) => {
    try {
      const deleteProduct = await ProductRepository.deleteRecordProduct({
        _id: req.params.productId,
      });
      res.json("Xóa sản phẩm thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };

  //Xóa 1 bản ghi product từ CSDL
  deleteAllProductFromDatabase = async (req, res) => {
    try {
      const deleteAllProduct = await ProductRepository.deleteAllProduct();
      res.json("Xóa tất cả sản phẩm thành công");
    } catch (error) {
      res.json(new InternalServerError(error));
    }
  };
}

module.exports = new ProductController();
