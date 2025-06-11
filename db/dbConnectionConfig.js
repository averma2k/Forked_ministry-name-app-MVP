// db/dbConnectionConfig.js

const { Pool } = require('pg');
require('dotenv').config();

console.log('--- db/dbConnectionConfig.js: Start of file ---');
console.log('--- db/dbConnectionConfig.js: After requiring pg ---');
console.log('--- db/dbConnectionConfig.js: After loading dotenv config ---');

const env_vars = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    // REMOVE or COMMENT OUT THIS ENTIRE SSL BLOCK:
    // ssl: {
    //     rejectUnauthorized: false // Use this if you're not using a CA bundle and for local testing
    // }
};

console.log('--- db/dbConnectionConfig.js: ENV_VARS -> HOST: %s, USER: %s, DB: %s, PORT: %s ---',
    env_vars.host, env_vars.user, env_vars.database, env_vars.port);

const pool = new Pool(env_vars);

// --- ADD THESE LOGGING LISTENERS ---
pool.on('connect', client => {
    console.log('--- DB Connection: Client connected successfully! ---');
});

pool.on('error', (err, client) => {
    console.error('--- DB Error: Unexpected error on idle client ---', err.message, err.stack);
    // You might want to gracefully shut down or re-establish connection here
});

// Optional: Test initial connection
pool.connect()
    .then(client => {
        console.log('--- DB Connection: Initial test connection successful! ---');
        client.release(); // Release the client immediately
    })
    .catch(err => {
        console.error('--- DB Connection: Initial test connection FAILED! ---', err.message, err.stack);
        // It's critical to log this error
    });
// --- END ADDED LOGGING LISTENERS ---

console.log('--- db/dbConnectionConfig.js: PostgreSQL pool created ---');
console.log('--- db/dbConnectionConfig.js: Before exporting pool ---');
module.exports = pool;
console.log('--- db/dbConnectionConfig.js: module.exports = pool completed ---');
