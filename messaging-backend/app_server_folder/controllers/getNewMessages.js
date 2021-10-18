const pool = require("./postgresInitialise")
const { getPositionOfLineAndCharacter } = require("typescript")

const getNewMessages = (chatNumber, highestId) => {
	return new Promise(function(resolve, reject) {
		pool.query("select * from message where sent_to=$1 and message_key > $2", [chatNumber, highestId])
		.then(response => {
			if (response.rows[0] === null) {
				resolve(false)
			} else {
				resolve(response.rows) // idk if this will work at the moment
			};
		})
		.catch(err => {
			reject(err);
		});
	});
};

module.exports = getNewMessages;