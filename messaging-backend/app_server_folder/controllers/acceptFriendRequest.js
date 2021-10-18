const pool = require("./postgresInitialise");
//note that this function simply serves to find a friend request and see whether the chat already exists.



function findFriendRequest(fromUser, toUser) {
	return new Promise(function(resolve, reject) {
		pool.query("select * from friendrequest where from_user=$1 and to_user=$2", [fromUser, toUser])
		.then(response => {
			if (response.rows) {
				console.log("found friend request")
				resolve(response.rows[0].request_id)
			} else {
				reject(false)
			}
		});
	});
};

function findChat(chatNumber) {
	return new Promise(function(resolve, reject) {
		console.log("finding chat")
		pool.query("select (chat_key) from chat where chat_key=$1", [chatNumber])
		.then(response => {
			if (response.rows[0].chat_key) {
				resolve(response.rows[0].chat_key)
			} else {
				resolve(false) // we don't want this to throw an error
			}
		})
		.catch(err => {
			resolve(false)  
		})
	})
}

// <-=== this function will need to take in a chat number otherwise it will not work

const acceptFriendRequest = (from_user, to_user) => {
	return new Promise(function(resolve, reject) {
		console.log("accepting friend request")
		findFriendRequest(from_user, to_user)
		.then(response => {
			return findChat(response)
		})
		.then(response => {
			if (response) {
				resolve(response)
			} else {
				reject(false) // we need the user to send a request to the create chat endpoint using their user id as the chat number
			}
		})
		.catch(err => {
			reject(err);
		});
	});
};
//this function now only checks to see whether the friend request has been made
//also we will need to modify the friend request function so users can add chatNumbers for chats that have already been made

module.exports = acceptFriendRequest
