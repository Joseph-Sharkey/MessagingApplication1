const pool = require("./postgresInitialise");

const findChatMember = (chatNumber) => {
	return new Promise(function(resolve, reject) {
		pool.query("select * from chatparticipant inner join appuser on chatparticipant.user_key=appuser.user_id where chat_key=$1", [chatNumber])
		.then(response => {
			resolve(response.rows); //ambiguous
		})
		.catch(err => {
			reject(err);
		});
	});
};

module.exports = findChatMember;