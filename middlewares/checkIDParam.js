const checkIDParam = (Model) => {
	return async (req, res, next, val) => {
		const result = await Model.findByPk(val);
		if (!result) {
			res.status(404).json({ status: "failed", message: "ID not found" });
		}
		req.id = val;
		next();
	};
};

module.exports = checkIDParam;
