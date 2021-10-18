const pool = require("./postgresInitialise");
const getFinalChatValue = () => {
	return new Promise(function(resolve, reject) {
		pool.query("select chat_key from chat order by chat_key DESC limit 1")
		.then(response => {
			console.log(response)
			resolve(response.rows[0])
		})
		.catch(err => {
			reject(err)
		})
	})
}
console.log("executing function")
getFinalChatValue()
.then(response => {
	console.log("program finisehd");
})
.catch(err => {
	console.log(err)
})

module.exports = getFinalChatValue;