const pool = require('../db');

class UserService {
  static async get(username) {
    const sql = `
      SELECT 
        u."id", 
        r.description AS "role", 
        username, 
        password, 
        r.post_limit AS "postLimit"
      FROM users AS u
        INNER JOIN roles AS r ON r."id" = u.role_id
      WHERE username = $1
    `;
    const params = [username];
    const response = await pool.query(sql, params);

    return response.rows[0];
  }

  static async getPosts(username, status) {
    const sql = `
      SELECT 
        u.username,
        c.category,
        p.title,
        p.slug,
        p.cover,
        p.body,
        p.created_at as "createdAt",
        p.status
      FROM users AS u
        INNER JOIN posts AS p ON p.user_id = u."id"
        INNER JOIN categories AS c ON c."id" = p.category_id
      WHERE u.username = $1 AND p.status = $2
    `;
    const params = [username, status];
    const response = await pool.query(sql, params);
    // if status is not in [published, draft] then DB throws error
    // because the enum_type defined
    return response.rows;
  }
}

module.exports = UserService;