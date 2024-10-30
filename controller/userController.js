import con from "../connection/connect.mjs";
//const all =
const all = async function () {
	const db = await con();
	try {
		const [rows] = await db.execute("Select * from User");
		console.log(rows);
	} catch (err) {
		console.error("Error connecting to MySQL:", err);
	} finally {
	}
};

export { all };
