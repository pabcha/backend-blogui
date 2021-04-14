const pool = require('../db');
const CategoryService = require('./../services/category');

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

  static async store(post) {
    const {
      user_id,
      category_id,
      title,
      slug,
      cover,
      body,
      status
    } = post;
    const sql = `
      INSERT INTO posts(user_id, category_id, title, slug, cover, body, created_at, status)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
    `;
    const params = [user_id, category_id, title, slug, cover, body, status];
    await pool.query(sql, params);
  }

  static async delete(slug) {
    const sql = `DELETE FROM posts WHERE slug = $1`;
    const params = [slug];
    await pool.query(sql, params);
  }

  static async validate(post) {
    if (!post.category_id) { return { isValid: false, error: 'category is required' } }
    if (!post.title) { return { isValid: false, error: 'title is required' } }
    if (!post.slug) { return { isValid: false, error: 'slug is required' } }
    //if (!post.cover) { return { isValid: false, error: 'cover is required' } }
    if (!post.body) { return { isValid: false, error: 'body is required' } }
    if (!post.status) { return { isValid: false, error: 'status is required' } }

    if ( !(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(post.slug)) ) {
      return { isValid: false, error: 'slug has invalid format' };
    }

    const category = await CategoryService.get(post.category_id);
    if (!category) { return { isValid: false, error: 'category doesn\'t match' } }

    return { isValid: true };
  }
}

module.exports = PostService;