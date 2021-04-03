const PostService = require('./../services/post');

exports.getPosts = async (req, res, next) => {
  try {
    const category = req.query.category;
    let posts = [];
    
    if (!category || category === 'all') {
      posts = await PostService.all();
    } else {
      posts = await PostService.getPostsByCategory(category);
    }

    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    const post = await PostService.get(slug);
    res.json({ data: post });
  } catch (error) {
    next(error);
  };
};