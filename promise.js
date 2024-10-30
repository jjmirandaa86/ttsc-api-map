console.log("================0");

fetch("https://pokeapi.co/api/v2/ability")
	.then((data) => {
		console.log("================2");
		return data.json();
	})
	.then((data) => {
		console.log("================3");
		console.log(data);
		console.log("================4");
	})
	.catch((err) => {
		console.log("This is an error.");
		console.error(err);
	})
	.finally(() => {
		console.log("================5");
		console.log("close connection");
	});

console.log("================1");
