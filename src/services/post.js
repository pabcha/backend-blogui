const pool = require('../db');

class PostService {
  static async all() {
    const sql = `
      SELECT 
        title, 
        u.username, 
        c.category, 
        cover,
        slug, 
        body, 
        created_at as "createdAt", 
        status 
      FROM posts as p
        inner join users as u on u."id" = p.user_id
        inner join categories as c on c."id" = p.category_id
      WHERE p.status = 'published'
    `;
    const params = [];
    const response = await pool.query(sql, params);

    return response.rows;
  }

  static async get(slug) {
    const sql = `
      SELECT 
        title, 
        u.username, 
        c.category, 
        cover,
        slug, 
        body, 
        created_at AS "createdAt", 
        status 
      FROM posts AS p
        INNER JOIN users AS u ON u."id" = p.user_id
        INNER JOIN categories AS c ON c."id" = p.category_id
      WHERE p.status = 'published' AND slug = $1
    `;
    const params = [slug];
    const response = await pool.query(sql, params);

    return response.rows[0];
  }

  static async getPostsByCategory(category) {
    const sql = `
      SELECT 
        title, 
        u.username, 
        c.category, 
        cover,
        slug, 
        body, 
        created_at as "createdAt", 
        status 
      FROM posts as p
        inner join users as u on u."id" = p.user_id
        inner join categories as c on c."id" = p.category_id
      WHERE p.status = 'published' and c.category = $1
    `;
    const params = [category];
    const response = await pool.query(sql, params);

    return response.rows;
  }
}

module.exports = PostService;