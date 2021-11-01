const pool = require("./postgresInitialise");

function createFriendRequest(userNumber, requestedNumber, proposedChatName, proposedChatDescription, isChat) {
	let insertValue=0 
	return new Promise(function(resolve, reject) {
		if (isChat) {
			insertValue=1	
		}
		pool.query("insert into friendrequest (from_user, to_user, proposed_name, proposed_description, accepted, isChat) values ($1, $2, $3, $4, 0, $5)", [userNumber, requestedNumber, proposedChatName, proposedChatDescription, isChat])
		.then(response => {
			resolve(true);
		})
		.catch(err => {
			reject(err);
		});
	});

};

module.exports = createFriendRequest;