const pool = require("./postgresInitialise")

const sendNewText = (message, userNumber, chatNumber) => {
	return new Promise(function(resolve, reject) {
		pool.query("insert into message(content, sent_by, sent_to) values ($1, $2, $3)", [message, userNumber, chatNumber])
		.then(response => {
			resolve(true)	
		})
		.catch(err => {
			reject(err)
		});
	});
};

module.exports = sendNewText;