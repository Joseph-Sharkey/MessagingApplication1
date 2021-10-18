const pool = require("../controllers/postgresInitialise");

// use this to find out how to format the data from the database

function test() {
	return new Promise(function(resolve, reject) {
		pool.query("select * from account")	
		.then(response => {
			resolve(response)
		});
	});
};


test()
.then(data => {
	console.log(data.rows[0].email);
})
.catch(err => {
	console.log(err)
});


// if no data, response.rows will return undefined