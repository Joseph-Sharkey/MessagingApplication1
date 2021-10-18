const e = require("express");
const pool = require("./postgresInitialise");

async function findChatDetailsQuery (chatNumber) {
	return new Promise(function(resolve, reject) {
		pool.query("select * from chat where chat_key=$1", [chatNumber])
		.then(response => {
			resolve(response.rows[0])
		})
		.catch(err => {
			reject(err)
		})
	})
}

async function findChatDetails2 (chatNumbers) {
	dataArray = []
	currentCount = 0
	return new Promise(function(resolve, reject) {
		chatNumbers.forEach(dataObject=> {
			findChatDetailsQuery(dataObject.chat_key)
			.then(data => {
				dataArray.push(data)
				currentCount += 1
				console.log(dataArray)
				if (currentCount === chatNumbers.length) {
					resolve(dataArray) 
				}
			});
		});
	});
};

async function findChatDetails (chatNumbers) {
	return new Promise(function(resolve, reject) {
		dataArray = []
		currentCount = 0
		try {
		chatNumbers.forEach(dataObject=> {
			findChatDetailsQuery(dataObject.chat_key)
			.then(data => {
				dataArray.push(data)
				currentCount += 1
				if (currentCount === chatNumbers.length) {
					resolve(dataArray) 
				}
			});
		});
		} catch {
			reject("findChatDetailsFunction did not work")
		}
	})
};
module.exports = findChatDetails