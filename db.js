const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    //connectionString: "http://localhost:5432",
    database: "weather_here"
});

module.exports = pool;