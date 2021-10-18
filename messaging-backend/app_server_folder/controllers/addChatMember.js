const e = require("express");
const pool = require("./postgresInitialise");

const addChatMember = (member, chat) => {
	return new Promise(function(resolve, reject) {
			pool.query("insert into chatParticipant(chat_key, user_key) values ($1, $2)", [chat, member])
		.then(response => {
			resolve(true)
		})
		.catch(err => {
			reject(err)
		});
	});
};

module.exports = addChatMember