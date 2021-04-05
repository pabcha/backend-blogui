const jwt = require('jsonwebtoken');

class AuthService {
  static auth({ username, role }) {
    const account = { username, role };
    
    const token = jwt.sign(
      { account }, 
      process.env.APP_SECRET, 
      { expiresIn: '30d' }
    );
  
    return token;
  }
}

module.exports = AuthService;