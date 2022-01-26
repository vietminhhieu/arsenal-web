const ProductModel = require("../model/ProductModel");

class ProductRepository {
  findAllProduct = async () => {
    return await ProductModel.find({});
  };

  findOneProduct = async (productId) => {
    return await ProductModel.findById(productId);
  };

  addRecordProduct = async (
    id_category,
    name,
    thumbnail,
    color,
    capacity,
    price,
    promotion,
    category,
    description,
    visited
  ) => {
    return await ProductModel(
      id_category,
      name,
      thumbnail,
      color,
      capacity,
      price,
      promotion,
      category,
      description,
      visited
    ).save();
  };

  updateRecordProduct = async (
    productId,
    name,
    thumbnail,
    color,
    capacity,
    price,
    promotion,
    category,
    description,
    visited
  ) => {
    return await ProductModel.updateOne(
      productId,
      name,
      thumbnail,
      color,
      capacity,
      price,
      promotion,
      category,
      description,
      visited
    );
  };

  deleteRecordProduct = async (productId) => {
    return await ProductModel.deleteOne(productId);
  };

  deleteAllProduct = async () => {
    return await ProductModel.deleteMany();
  };

  //Lấy ra product ID
  getProductId = async (productName) => {
    return await ProductModel.findOne({ name: productName });
  };
}

module.exports = new ProductRepository();
