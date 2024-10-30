const express = require("express");
const dot = require("dotenv");
const connectDB = require("../db/db");
const {
	messageConsoleRequest,
	messageRed,
	messageGreen,
	pagination,
} = require("../utility/general");

const router = express.Router();
const limit = parseInt(process.env.ITEMS_PER_PAGE);
const entity = "User";
let message = "";

//GET - All Users
router.get("/", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const offSet = (page - 1) * limit;
		let totalData = 0;

		const db = await connectDB();

		//GET COUNT
		let query = `SELECT count(*) AS COUNT FROM User`;
		const [countData] = await db.query(query);
		totalData = countData[0].COUNT;

		//GET DATA
		query = `SELECT * FROM User LIMIT ${limit} OFFSET ${offSet}`;
		const [results] = await db.query(query);

		//Pagination
		const paginationData = pagination(page, limit, offSet, totalData, req);

		//Message
		messageGreen(messageConsoleRequest(req, entity));
		message = results.length !== 0 ? "Get all user" : "No data available.";

		//Return
		res.json({
			status: 200,
			statusText: message,
			error: false,
			data: results,
			totalData: totalData,
			page: page,
			pagination: results.length > 0 ? paginationData : {},
		});
	} catch (error) {
		messageRed(messageConsoleRequest(req, entity) + `${error.message}`);
		res.status(500).json({
			status: 500,
			statusText: `Error: Get all user, ${error.message}`,
			error: true,
			data: [],
			totalData: 0,
			page: 0,
			pagination: {},
		});
	}
});

//GET - User By ID
router.get("/:id", async (req, res) => {
	const idUser = parseInt(req.params.id);
	try {
		//GET DATA
		const db = await connectDB();
		let query = `SELECT * FROM User WHERE idUser = ?`;
		const [results] = await db.query(query, idUser);
		//Message
		messageGreen(messageConsoleRequest(req, entity));

		//Return
		res.json({
			status: 200,
			statusText: `Get user id ${idUser}`,
			error: false,
			data: results,
			totalData: results.length,
			page: 1,
			pagination: {},
		});
	} catch (error) {
		messageRed(messageConsoleRequest(req, entity) + `${error.message}`);
		res.status(500).json({
			status: 500,
			statusText: `Error: Get user idUser: ${idUser}, ${error.message}`,
			error: true,
			data: [],
			totalData: 0,
			page: 0,
			pagination: {},
		});
	}
});

//EDIT -> send body object {}
router.put("/:id", async (req, res) => {
	const idUser = parseInt(req.params.id);
	const name = req.body.name;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const state = req.body.state;

	try {
		//GET DATA
		const db = await connectDB();
		let query =
			"UPDATE User SET name = (?), lastName = (?), email = (?), state = (?) where idUser = (?)";
		const [results] = await db.query(query, [
			name,
			lastName,
			email,
			state,
			idUser,
		]);
		//Message
		messageGreen(messageConsoleRequest(req, entity));

		//Return
		res.json({
			status: 200,
			statusText: `Put user idUser ${idUser}`,
			error: false,
			data: results,
		});
	} catch (error) {
		messageRed(messageConsoleRequest(req, entity) + `${error.message}`);
		res.status(500).json({
			status: 500,
			statusText: `Error: Put user idUser: ${idUser}, ${error.message}`,
			error: true,
			data: [],
		});
	}
});

//ADD -> send body object {}
router.post("/", async (req, res) => {
	const name = req.body.name;
	const lastName = req.body.lastName;
	const password = req.body.password;
	const email = req.body.email;
	const state = req.body.state;

	try {
		//GET DATA
		const db = await connectDB();
		let query =
			"INSERT User (name, lastName, password, email, state) values ((?), (?), (?), (?), (?)) ";
		const [results] = await db.query(query, [
			name,
			lastName,
			password,
			email,
			state,
		]);
		//Message
		messageGreen(messageConsoleRequest(req, entity));

		//Return
		res.json({
			status: 200,
			statusText: `Add user`,
			error: false,
			data: results,
		});
	} catch (error) {
		messageRed(messageConsoleRequest(req, entity) + `${error.message}`);
		res.status(500).json({
			status: 500,
			statusText: `Error: Add user: ${error.message}`,
			error: true,
			data: [],
		});
	}
});

//DELETE - User By ID
router.delete("/:id", async (req, res) => {
	const idUser = parseInt(req.params.id);
	try {
		//GET DATA
		const db = await connectDB();
		let query = `Delete from User WHERE idUser = ?`;
		const [results] = await db.query(query, idUser);
		//Message
		messageGreen(messageConsoleRequest(req, entity));

		//Return
		res.json({
			status: 200,
			statusText: `Delete user id ${idUser}`,
			error: false,
			data: results,
		});
	} catch (error) {
		messageRed(messageConsoleRequest(req, entity) + `${error.message}`);
		res.status(500).json({
			status: 500,
			statusText: `Error: Delete user idUser: ${idUser}, ${error.message}`,
			error: true,
			data: [],
		});
	}
});

module.exports = router;
