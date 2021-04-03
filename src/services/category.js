const pool = require('../db');

class CategoryService {
  static async all() {
    const sql = `SELECT id, category FROM categories`;
    const params = [];
    const response = await pool.query(sql, params);

    return response.rows;
  }
}

module.exports = CategoryService;