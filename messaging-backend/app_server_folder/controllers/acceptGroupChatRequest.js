const pool = require("./postgresInitialise");

const acceptGroupChatRequest = (toUser, chatNumber) => {
	return new Promise(function(resolve, reject) {
		pool.query("insert into chatparticipant(user_key, chat_key) values ($1, $2)", [toUser, chatNumber])
		.then(response => { 
			resolve(true)
		})
		.catch(err => {
			reject(err)
		});
	});
};


module.exports = acceptGroupChatRequest;
