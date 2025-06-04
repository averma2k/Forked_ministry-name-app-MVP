// import dependencies
const {Pool} =require('pg');
require('dotenv').config();
console.log('dbConnectionConfig.js: After dotenv config, before pool init.'); // <--- ADD THIS LINE

// database connection with env variables:
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER ,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  connectionTimeoutMillis: 5000, // 5 seconds
});

// Add logging for pool connection errors
pool.on('error', (err, client) => {
  console.error('dbConnectionConfig.js: Unexpected error on idle PostgreSQL client', err);
});

console.log('dbConnectionConfig.js: PostgreSQL Pool initialized.'); // <--- EXISTING LOG

// Test the connection immediately on startup (optional but useful for debugging)
(async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('dbConnectionConfig.js: Successfully connected to PostgreSQL database!');
  } catch (err) {
    console.error('dbConnectionConfig.js: Failed to connect to PostgreSQL database on startup:', err.message || err);
  } finally {
    if (client) {
      client.release();
    }
  }
})();

module.exports = pool;
