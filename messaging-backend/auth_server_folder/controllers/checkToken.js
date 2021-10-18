const jwt = require("jsonwebtoken");
require("dotenv").config();


function checkToken(token) {
	try {
		const decoded = jwt.verify(token, `${process.env.SECRET}`);
		if (!decoded.valid) {
			return false
		}
		if (decoded.exp > Date.now()) {
			return false
		}
		return true;

	} catch(err) {
		return false
	}

}


module.exports = checkToken