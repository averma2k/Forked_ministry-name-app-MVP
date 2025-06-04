// import dependencies
const {Pool} =require('pg');
require('dotenv').config();

// database connection with env variables:
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER ,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  // Add a connection timeout to prevent indefinite hangs
  connectionTimeoutMillis: 5000, // 5 seconds
});

// Add logging for pool connection errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  // It's recommended to terminate the process if an unhandled error occurs
  // on an idle client, as it indicates a serious issue.
  // process.exit(-1); // Only uncomment if you want the app to crash on such errors
});

console.log('PostgreSQL Pool initialized.');

// Test the connection immediately on startup (optional but useful for debugging)
(async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database!');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL database on startup:', err.message || err);
  } finally {
    if (client) {
      client.release();
    }
  }
})();


module.exports = pool;
