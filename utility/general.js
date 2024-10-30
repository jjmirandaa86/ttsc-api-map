//MESSAGES
const messageConsoleRequest = (req, entity) =>
	`Request: ${req.method} - ${entity} - ${urlRequest(req)}`;

const messageRed = (text) => console.log(`\x1b[41m ${text} \x1b[0m`);

const messageGreen = (text) => console.log(`\x1b[42m ${text} \x1b[0m`);

//ROUTE
const urlRequest = (req) =>
	req.protocol + "://" + req.get("host") + req.originalUrl;

const urlRequestWithoutPage = (text) => {
	return text.slice(0, text.indexOf("?"));
};

//PAGINATION
const pagination = (page, limit, offSet, totalData, req) => {
	let firstPageUrl = "";
	if (page !== 1)
		firstPageUrl = urlRequestWithoutPage(urlRequest(req)) + `?page=1`;

	let previewPageUrl = "";
	if (page !== 1)
		previewPageUrl = urlRequestWithoutPage(urlRequest(req)) + `?page=${page - 1}`;

	let lastPageUrl = "";
	if (page !== Math.ceil(totalData / limit))
		lastPageUrl =
			urlRequestWithoutPage(urlRequest(req)) +
			`?page=${Math.ceil(totalData / limit)}`;

	let nextPageUrl = "";
	if (page !== Math.ceil(totalData / limit))
		nextPageUrl = urlRequestWithoutPage(urlRequest(req)) + `?page=${page + 1}`;

	return {
		firstPageUrl: firstPageUrl,
		lastPageUrl: lastPageUrl,
		previewPageUrl: previewPageUrl,
		nextPageUrl: nextPageUrl,
	};
};

module.exports = {
	messageConsoleRequest,
	messageRed,
	messageGreen,
	urlRequest,
	urlRequestWithoutPage,
	pagination,
};
