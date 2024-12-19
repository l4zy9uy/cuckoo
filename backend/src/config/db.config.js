dotenv = require('dotenv');
dotenv.config();
console.log("password: ", process.env.DB_PASSWORD);

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.DB_USER,
    PASSWORD : process.env.DB_PASSWORD,
    DB: "testdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};