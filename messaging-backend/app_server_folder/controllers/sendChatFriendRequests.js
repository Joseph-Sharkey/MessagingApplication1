const { request } = require("http");
const pool = require("./postgresInitialise");


function createFriendRequest(requestId, userNumber, requestedNumber, proposedChatName, proposedChatDescription, isChat) {
	let insertValue=0 
	return new Promise(function(resolve, reject) {
		if (isChat) {
			insertValue = 1;
		}
		pool.query("insert into friendrequest (from_user, to_user, proposed_name, proposed_description, accepted, isChat, chatnumber) values ($1, $2, $3, $4, 0, 1, $5)", [userNumber, requestedNumber, proposedChatName, proposedChatDescription, isChat, requestId])
		.then(response => {
			resolve(true);
		})
		.catch(err => {
			reject(err);
		});
	});

};

const sendChatFriendRequests = (userNumber, requestedNumbers, chatName, chatDescription, chatNumber) => {
	maxLoops = requestedNumbers.length
	currentLoop = 0
	return new Promise(function(resolve, reject) {
		try {
			requestedNumbers.forEach((number) => {
				createFriendRequest(chatNumber, userNumber, number, chatName, chatDescription)
				.then(response => {
					if (response === true) {
						currentLoop += 1
						if (currentLoop === maxLoops) {
							resolve(true)
						}
					};
				});
			});
		} catch {
			reject("second error during sendChatFriendRequests loop");
		}
	});
};


module.exports = sendChatFriendRequests