const User = require("../models").User;
const findUserByToken = async (payloadID) => {
	try {
		const userID = payloadID;
		const user = await User.findByPk(userID);
		return user;
	} catch (error) {
		console.log(error.message);
	}
};
module.exports = findUserByToken;
