const sendResponseResponse = (res, statusCode, status, message, data) => {
	return res.status(statusCode).json({
		status,
		message,
		data,
	});
};
const sendErrorResponse = (res, statusCode, status, message) => {
	res.status(statusCode).json({ status, message });
};

module.exports = { sendResponseResponse, sendErrorResponse };
