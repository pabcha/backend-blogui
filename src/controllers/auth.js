const AuthService = require('./../services/auth');
const UserService = require('./../services/user');
const hash = require('./../utils/hash');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const account = await UserService.get(username);
    
    if (!account) {
      return res.status(404).json({ error: 'We couldn\'t find an account matching the username you entered.' });
    }

    const { role } = account;
    const passwordHash = hash(password);
    if (passwordHash !== account.password) {
      return res.status(301).json({ error: 'We couldn’t find an account matching the username and password you entered. Please check your username and password and try again.' });
    }
    
    const token = AuthService.auth({ username, role });
    res.json({
      success: true,
      data: { username, role, token }
    });
  } catch (error) {
    next(error);
  }
};