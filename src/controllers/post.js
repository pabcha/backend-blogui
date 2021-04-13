const PostService = require('./../services/post');
const UserService = require('./../services/user');
const randomCover = require('./../utils/random-cover');

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

exports.storePost = async (req, res, next) => {
  try {
    const { id, username, postLimit, role } = req.user;
    const post = { user_id: id, ...req.body };
    const validate = await PostService.validate(post);
    if (!validate.isValid) {
      return res.status(301).json({ success: false, error: validate.error });
    }

    /*if (!['admin', 'recruiter'].includes(role)) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }*/

    const todayPosts = await UserService.countTodayPosts(username);
    const message = `You've reached your limit. You're only allow to post ${postLimit} per day.`;
    if (todayPosts >= postLimit) {
      return res.status(403).json({ success: false, error: message });
    }

    post.cover = randomCover();
    await PostService.store(post);
    res.json({ success: true, msg: 'Post created' });
  } catch (error) {
    next(error);
  }
}