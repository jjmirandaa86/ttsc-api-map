const express = require("express");
const userRoutes = require("./user");
const router = express.Router();

router
	.get("/", (req, res) => {
		res.status(200).json({ error: "welcome api" });
	})
	.use("/user", userRoutes);

module.exports = router;
