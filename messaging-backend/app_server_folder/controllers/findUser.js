const pool = require("./postgresInitialise");

const findUser = (userNumber) => {
	console.log("executing function")
	return new Promise(function(resolve, reject) {
		pool.query("select * from appUser where user_id=$1", [userNumber])
		.then(response => {
			console.log("function was successful")
			resolve(response.rows[0])
		})
		.catch(err => {
			console.log("function was not successful")
			console.log(err)
			reject(err);
		});
	})
};

module.exports = findUser;