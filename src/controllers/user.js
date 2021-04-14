const UserService = require('./../services/user');
const PostService = require('./../services/post');

exports.getUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const account = await UserService.get(username);

    if (!account) {
      res.status(404).json({ error: 'User Not Found' });
    }
    
    user = { 
      username: account.username, 
      role: account.role,
      postLimit: account.postLimit
    };
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const status = req.query.status || 'published';
    const username = req.params.username;
    const account = await UserService.get(username);
    
    if (!account) {
      res.status(404).json({ error: 'User Not Found' });
    }
    
    const posts = await UserService.getPosts(username, status);
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

exports.getUserPost = async (req, res, next) => {
  try {
    const username = req.user.username; // take user logged
    const slug = req.params.slug;
    const account = await UserService.get(username);
    
    if (!account) {
      res.status(404).json({ error: 'User Not Found' });
    }
    
    const post = await UserService.getPost(username, slug);
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserPost = async (req, res, next) => {
  try {
    const username = req.user.username;
    const role = req.user.role;
    const slug = req.params.slug;

    if (!['admin', 'recruiter'].includes(role)) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const post = await UserService.getPost(username, slug);
    if (!post) {
      return res.status(400).json({ error: 'We couldn\'t find your post or the post is not available to you.'});
    }
    
    await PostService.delete(slug);
    res.status(202).json({ success: true });
  } catch (error) {
    next(error);
  }
};