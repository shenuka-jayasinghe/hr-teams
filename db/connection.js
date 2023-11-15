const { Pool } = require('pg')


if (!process.env.PGDATABASE) {
    throw new Error('PGDATABASE not set!');
  }
  
  
  const pool = new Pool({
    user: 'postgres',
    password: 'key_sj_12345!',
  }
  );
  
  module.exports = pool;
  