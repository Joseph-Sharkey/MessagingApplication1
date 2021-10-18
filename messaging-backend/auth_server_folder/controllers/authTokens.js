const jwt = require("jsonwebtoken")
require("dotenv").config();

function authTokens() {
	const accessExpiry = Date.now() + 30 * 60 * 1000 //30 minutes in milliseconds
	const accessTokenCookie = jwt.sign({id: "", exp: accessExpiry, type: "access", valid: true}, `${process.env.SECRET}`)
	const refreshExpiry =  Date.now() + 14 * 24 * 3600 * 1000  //2 weeks in milliseconds
	const refreshTokenCookie = jwt.sign({id: "", exp: refreshExpiry, type: "refresh", valid: true}, `${process.env.SECRET}`)
	authObject = {
		accessToken: accessTokenCookie,
		refreshToken: refreshTokenCookie
	}
	console.log(authObject)
	return authObject 
}


module.exports = authTokens;