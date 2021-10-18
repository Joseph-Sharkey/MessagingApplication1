const pool = require("./postgresInitialise");



const checkFriendRequests = (userNumber) => {
	return new Promise(function(resolve, reject) {
		pool.query("select * from friendrequest inner join appuser on friendrequest.from_user=appuser.user_id where friendrequest.to_user=$1 and friendrequest.accepted=0", [userNumber])
		.then(response => {
			resolve(response.rows); //check this later
		})
		.catch(err => {
			reject(err);
		});
	});
};

module.exports = checkFriendRequests;
