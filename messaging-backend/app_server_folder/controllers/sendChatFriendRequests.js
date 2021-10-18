const pool = require("./postgresInitialise");
const createFriendRequest = require("./createFriendRequest");

const sendChatFriendRequests = (userNumber, requestedNumbers, chatName, chatDescription) => {
	maxLoops = requestedNumbers.length
	currentLoop = 0
	return new Promise(function(resolve, reject) {
		try {
			requestedNumbers.forEach((number) => {
				createFriendRequest(userNumber, number, chatName, chatDescription)
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