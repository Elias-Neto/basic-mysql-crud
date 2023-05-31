require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const createDatabase = async () => {
  await pool.query('CREATE DATABASE IF NOT EXISTS books_db')
  await pool.query('USE books_db')
}

const createTable = async () => {
  await pool.query('CREATE TABLE IF NOT EXISTS books (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255))')
}

const initDatabase = async () => {
  await createDatabase()
  await createTable()
}

module.exports = {
  pool,
  initDatabase
}