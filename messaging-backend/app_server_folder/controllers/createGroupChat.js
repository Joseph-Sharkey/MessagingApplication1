const pool = require("./postgresInitialise");

//this function is meant to be executed before sending friend requests to all the users involved in the group chat, 

const createGroupChat = (userNumber, chatName, ChatDescription) => {
	return new Promise(function(resolve, reject) {
		pool.query("INSERT INTO chat (chat_name, chat_description) values ($1, $2) returning chat_key", [chatName, ChatDescription])
		.then(response => {
			pool.query("insert into chatparticipant (user_key, chat_key) values ($1, $2)", [userNumber, response.rows[0].chat_key])
		})
		.then(response => {
			resolve(true);
		})
		.catch(err => {
			reject(err);
		})
	})	
}

module.exports = createGroupChat

