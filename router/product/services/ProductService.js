const CategoryRepository = require("../../category/repositories/CategoryRepository");

class ProductService {
  getCategoryIdFromService = async (categoryName) => {
    let res;

    const categoryRecord = await CategoryRepository.getCategoryIdFromCategory(
      categoryName
    );

    res = { category_id: categoryRecord._id };

    return res;
  };
}

module.exports = ProductService;
