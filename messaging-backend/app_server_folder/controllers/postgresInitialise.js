const {Pool} = require("pg")
require("dotenv").config()

const pool = new Pool({
	user: `${process.env.DBUSERNAME}`,
	host: `localhost`,
	database: `${process.env.DATABASE}`,
	password: `${process.env.password}`,
	port: 5432
});


module.exports = pool;