require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const authTokens = require("../authTokens");

const pool = new Pool({
	user: `${process.env.DBUSERNAME}`,
	host: "localhost",
	database: `${process.env.DATABASE}`,
	password: `${process.env.DBPASSWORD}`,
	port: 5432 
});


function checkLoginDetails(data) {
	let userId;
	console.log("checking login details");
	return new Promise(function(resolve, reject) {
		pool.query("SELECT * FROM account WHERE email=$1", [data.email])
		.then(response => {
			console.log(response.rows)
			userId = response.rows[0].user_id
			return response.rows[0].password;
		})
		.then((resData) => {
			return bcrypt.compare(data.password, resData);
		})
		.then(response => {
			if (response) {
				resolve(userId);
			} else {
				resolve(false);
			}
		})
		.catch(err => {
			console.log(err)
			resolve(false);
		});
	});
};

module.exports = checkLoginDetails;