const ProductService = require("../services/ProductService");

class ProductController extends ProductService {
  testFunction = async (req, res) => {
    try {
      this.logMessage();
      const result = await this.createNewRecord("Apple");
      res.send(result.name);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new ProductController();
