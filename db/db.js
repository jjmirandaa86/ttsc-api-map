const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();
async function connectDB() {
	const connection = await mysql.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWD,
		database: process.env.DB,
		port: process.env.DB_PORT,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	});
	return connection;
}

module.exports = connectDB;
