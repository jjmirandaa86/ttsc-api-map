import mysql from "mysql2/promise";

const con = async () => {
	try {
		const conEstablish = await mysql.createConnection({
			host: "localhost",
			user: "dbMap",
			password: "dbMap",
			database: "dbMap",
			//port: 3306,
		});

		console.log("connection established");
		return conEstablish;
	} catch (error) {
		console.log("Error", error);
		throw error; //
	} finally {
		console.log("finished connection");
	}
};

export default con;

//test connection
//node connection/connect.mjs
