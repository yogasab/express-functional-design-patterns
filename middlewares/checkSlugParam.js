const checkSlugParam = (Model) => {
	return async (req, res, next, val) => {
		const result = await Model.findOne({ where: { slug: val } });
		if (!result) {
			return res
				.status(404)
				.json({ status: "Failed", message: "Item not found" });
		}
		req.slug = val;
		if (result.constructor.name === "Computer") {
			// Computer
			req.id = result.user_id;
		} else {
			// User
			req.id = result.id;
		}
		next();
	};
};

module.exports = checkSlugParam;
