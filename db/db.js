const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();
async function connectDB() {
	const connection = await mysql.createPool({
		host: "localhost",
		user: "dbMap",
		password: "dbMap",
		database: "dbMap",
		port: 3306,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	});
	return connection;
}

module.exports = connectDB;
