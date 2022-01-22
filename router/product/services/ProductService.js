const CategoryRepository = require("../../category/repositories/CategoryRepository");

class ProductService {
  logMessage = () => {
    console.log("Hahaa");
  };

  createNewRecord = async (data) => {
    const cd = await CategoryRepository.findCategoryDetailByName("Apple");
    return cd;
  };
}

module.exports = ProductService;
