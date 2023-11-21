const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: "mysql-esauzito.alwaysdata.net",
    user: "esauzito_jorky",
    password: "skr1ll3x21394135",
    database: "esauzito_masivedata",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;