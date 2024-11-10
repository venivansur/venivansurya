require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectModule: require('pg'),
    port: process.env.POSTGRES_PORT || 5432, // Gunakan 5432 atau port yang sesuai
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectModule: require('pg'),
    port: process.env.POSTGRES_PORT || 5432, // Gunakan port yang sesuai
  },
};
