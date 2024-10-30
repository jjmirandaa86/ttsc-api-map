const dot = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const listRoute = require("./routes/index");

dot.config();
const PORT = process.env.NODE_PORT || 3000;

const app = express();

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(helmet())
	.use(morgan("combined"))
	.use(cors())
	.use(express.json())
	.use("/api", listRoute);

app
	.get("/", (req, res) => {
		res.send({ status: "Running" });
	})
	.listen(PORT, () => {
		console.log(`Listening API:  http://localhost:${PORT}/api`);
	});
