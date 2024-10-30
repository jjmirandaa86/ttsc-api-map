var data = null;
console.log("================0");

const dataApi = async (api) => {
	console.log("================2");
	const data = await fetch(api);
	console.log("================4");
	const json = await data.json();
	console.log("================5");
	console.log(json);
	console.log("================6");
	return json;
};

console.log("===============1");
data = dataApi("https://pokeapi.co/api/v2/ability");
console.log("================3");
console.log(data);
