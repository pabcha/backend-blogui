const UserService = require('./../services/user');

exports.getUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await UserService.get(username);

    if (!user) {
      res.status(404).json({ error: 'User Not Found' });
    }
    
    userAPI = { 
      username: user.username, 
      role: user.role,
      postLimit: user.postLimit
    };
    res.json({ success: true, data: userAPI });
  } catch (error) {
    next(error);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const status = req.query.status || 'published';
    const username = req.params.username;
    const user = await UserService.get(username);
    
    if (!user) {
      res.status(404).json({ error: 'User Not Found' });
    }
    
    const posts = await UserService.getPosts(username, status);
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};