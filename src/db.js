const { Pool } = require('pg');
const config = {};

if (process.env.ENVIRONMENT === 'production') {
  config.ssl = {
    rejectUnauthorized: false
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...config
});

module.exports = pool;