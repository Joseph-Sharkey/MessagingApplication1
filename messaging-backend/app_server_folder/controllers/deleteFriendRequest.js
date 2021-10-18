const pool = require("./postgresInitialise");
//rowcount is response parameter that will tell us if request is a success

const deleteFriendRequest = (userNumber, sentFrom) => {
	return new Promise(function(resolve, reject) {
		pool.query("update friendrequest set accepted=1 where to_user=$1 and from_user=$2", [userNumber, sentFrom])
		.then(response => {
			if(response.rowCount === 0) {
				reject(false)
			} else {
				resolve(true)
			}
		})
		.catch(err => {
			reject(err)
		})
	})
}

module.exports = deleteFriendRequest;