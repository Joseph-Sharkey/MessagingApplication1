const pool = require("./postgresInitialise");

function createFriendRequest(userNumber, requestedNumber, proposedChatName, proposedChatDescription) {
	return new Promise(function(resolve, reject) {
		pool.query("insert into friendrequest (from_user, to_user, proposed_name, proposed_description, accepted) values ($1, $2, $3, $4, 0)", [userNumber, requestedNumber, proposedChatName, proposedChatDescription ])
		.then(response => {
			resolve(true);
		})
		.catch(err => {
			reject(err);
		});
	});

};

module.exports = createFriendRequest;