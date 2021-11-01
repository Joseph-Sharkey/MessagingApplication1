const pool = require("./postgresInitialise");

function addToChat(chatNumber, userNumber) {
	return new Promise(function(resolve, reject) {
		pool.query("insert into chatparticipant (user_key, chat_key) values ($1, $2)", [userNumber, chatNumber])
		.then(response => {
			resolve(true)
		})
		.catch(err => {
			reject(err);
		});
	});
};

module.exports = addToChat;