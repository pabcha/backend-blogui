const pool = require('../db');

class PostService {
  static all() {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM posts',
        [],
        (error, response) => {
          if (error) return reject(error);
          resolve({ posts: response.rows });
        }
      )
    });
  }

  static get(slug) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM posts WHERE slug = $1',
        [slug],
        (error, response) => {
          if (error) return reject(error);
          resolve({ post: response.rows[0] });
        }
      )
    })
  }
}

module.exports = PostService;