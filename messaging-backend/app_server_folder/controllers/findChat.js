const pool = require("./postgresInitialise");

function findChat(chatNumber) {
	return new Promise(function(resolve, reject) {
		pool.query("select * from chat where chat_id=$1", [chatNumber])
		.then(response => {
			resolve(true)
		})
		.catch(err => {
			reject(err)
		})
	})
}

module.exports = findChat;