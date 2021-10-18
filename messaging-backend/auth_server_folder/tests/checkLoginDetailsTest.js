const checkLoginDetails = require("../controllers/queries/checkLoginDetails");
const details = {email: "jestTest", password: "jestTestPassword"}

/*
test("check login details query", () => {
	checkLoginDetails(details)
	.then(response => {
		expect(response).toBe(true)
	});
});
*/


function checkFunction() {
	checkLoginDetails(details)
	.then(response => {
		console.log(response)
	})
}

checkFunction()
