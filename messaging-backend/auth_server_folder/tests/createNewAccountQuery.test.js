const createNewAccountQuery = require("../controllers/queries/createNewAccountQuery");

test("newaccount query works correctly", () => {
	createNewAccountQuery({email: "xcvb", password: "vbncn"})
	.then(response => {
		expect(response).toBe(true);
	})
})

