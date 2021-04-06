const pool = require('../db');

class CategoryService {
  static async all() {
    const sql = `SELECT id, category FROM categories`;
    const params = [];
    const response = await pool.query(sql, params);

    return response.rows;
  }

  static async get(id) {
    const sql = `SELECT id, category FROM categories WHERE id = $1`;
    const params = [id];
    const response = await pool.query(sql, params);

    return response.rows[0];
  }
}

module.exports = CategoryService;