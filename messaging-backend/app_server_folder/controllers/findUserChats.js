const pool = require("./postgresInitialise");

//takes user_number and returns all chats and their details in array



const findUserChats = (userNumber) => {
	return new Promise(function(resolve, reject) {
		console.log("usernumber is " + userNumber)
		pool.query("select (chat_key) from chatparticipant where user_key=$1", [userNumber])
		.then(response => {
			return response.rows
		})
		.then(data => {
			console.log("userChatData is " + data)
			if(data) {
				resolve(data);
			} else {
				reject(false)
			}
		})
		.catch(err => {
			reject(err)
		})
	});
};

module.exports = findUserChats;


const findUserChats2 = (userNumber) => {
	return new Promise(function(resolve, reject) {
		pool.query("select (chat_key) from chatparticipant where user_key=$1")
	})
} // this is just a test to see how this function could be written in a more concise manner 