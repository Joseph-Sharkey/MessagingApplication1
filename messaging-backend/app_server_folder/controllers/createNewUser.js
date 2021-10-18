const pool = require("./postgresInitialise")

//this table uses the userNumber as a foreign key from the auth table allowing us to request the data of the desired user 
//there will also be section for date that the account was created but this is not needed right now 


function createNewUser(name, description, number) {
	return new Promise(function(resolve, reject) {
		pool.query("insert into appuser (user_id, username, description) values ($1, $2, $3)", [number, name, description])
		.then(response => {
			resolve(true)  //frontend will send another request to the backend to get the data later 
		})
		.catch(err => {
			reject(err);
		})
	});
}


module.exports = createNewUser;