import con from "./connect.mjs";
async function fetchData() {
	const db = await con();
	try {
		const [rows] = await db.execute("Show tables");
		console.log(rows);
	} catch (err) {
		console.error("Error connecting to MySQL:", err);
	} finally {
		await db.end();
	}
}

fetchData();

//test query
//node connection/query.mjs
