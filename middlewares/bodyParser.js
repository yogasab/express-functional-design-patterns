const bodyParser = (req, res, next) => {
	const { body } = req;
	req.formBody = body;
	next();
};

module.exports = bodyParser;
