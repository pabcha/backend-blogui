const CategoryService = require('./../services/category');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.all();
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
};