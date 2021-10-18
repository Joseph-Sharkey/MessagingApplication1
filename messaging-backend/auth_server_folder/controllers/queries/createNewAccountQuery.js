require("dotenv").config();

const { Pool } = require("pg")
const bcrypt = require("bcrypt");


const pool = new Pool({
	user: `${process.env.DBUSERNAME}`,
	host: "localhost",
	database: `${process.env.DATABASE}`,
	password: `${process.env.DBPASSWORD}`,
	port: 5432
});


function createNewAccountQuery(details) {
	console.log("creating new account")
	return new Promise(function(resolve, reject) {
		bcrypt.hash(details.password, 10)
		.then(hashedPassword => {
			return pool.query("INSERT INTO account (user_id, email, password) VALUES (nextval('serial'), $1, $2)", [details.email, hashedPassword])
		})
		.then(() => {
			resolve(true)
		})
		.catch((err) => {
			reject(err)
		});
	});
}

module.exports = createNewAccountQuery;