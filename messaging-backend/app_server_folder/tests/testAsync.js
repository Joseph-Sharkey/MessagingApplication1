function asyncStuff() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve("hello")
		}, 2000);
	});
};
function errorFunction() {
	throw("this is an error")
}

console.log("starting program");
asyncStuff()
.then(data => {
	errorFunction()
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log("there was an error");
	console.log("error");
});

