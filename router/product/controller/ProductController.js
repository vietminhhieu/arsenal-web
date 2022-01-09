const ProductService = require("../services/ProductService");

require("dotenv");

class ProductController extends ProductService {
  testFunction = async (req, res) => {
    try {
      this.logMessage();
      res.send("OK");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new ProductController();
