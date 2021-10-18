const pool = require("./postgresInitialise");

const findUserChatData = (chatNumber) => {
	return new Promise(function(resolve, reject) {
		pool.query("select * from message where sent_to=$1", [chatNumber])
		.then(response => {
			resolve(response.rows);
		})
		.catch(err => {
			reject(err);
		});
	});
};

module.exports = findUserChatData;


//IMPORTANT note that the message table foreign key references chats rather than user so we will need to first have the chat number