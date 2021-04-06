const jwt = require('jsonwebtoken');
const UserService = require('./../services/user');

async function isAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: 'Not Authorized to access this resource.'});

  try {
    const payload = jwt.verify(token, process.env.APP_SECRET);
    const account = await UserService.get(payload.account.username);
    if (!account) return res.status(401).json({ success: false, error: 'Not Authorized to access this resource.'});

    req.user = {
      id: account.id,
      username: account.username,
      role: account.role,
      postLimit: account.postLimit
    };
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = isAuth;