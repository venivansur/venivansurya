require('dotenv').config();
const pg = require('pg');

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectModule: pg,  // Menggunakan pg sebagai module PostgreSQL
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Hanya aktifkan SSL di produksi
      },
    } : undefined,  // Jangan aktifkan SSL di development
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectModule: pg,  // Menggunakan pg sebagai module PostgreSQL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,  // SSL diaktifkan di produksi
      },
    },
  },
};
