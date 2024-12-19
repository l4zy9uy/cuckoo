dotenv = require('dotenv');
dotenv.config();
console.log("password: ", process.env.DB_PASSWORD);

module.exports = {
    HOST: "localhost",
    USER: "root",
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