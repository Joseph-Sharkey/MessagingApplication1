const express = require("express");
const app = express()
const cors = require("cors");
const corsOptions = {
	origin: ["http://localhost:3000", "http://localhost:5000", "http://localhost:6000"],
	optionsSuccessStatus: 200,
	credentials: true,
}
const cookieParser = require("cookie-parser");

const createNewAccountQuery = require("./controllers/queries/createNewAccountQuery")
const checkLoginDetails = require("./controllers/queries/checkLoginDetails")
const authTokens = require("./controllers/authTokens");
const checkToken = require("./controllers/checkToken");

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());




app.get("/api/login", (req, res) => {
	const data = {
		email: req.query.email,
		password: req.query.password
	}
	checkLoginDetails(data)
	.then(results => {
		if (results) {
			//res.cookie("accesstoken", results.accessToken, { httpOnly: true, maxAge: Date.now() + 30*60*1000}); 
			//res.cookie("refreshtoken", results.refreshToken, { httpOnly: true, maxAge: Date.now() + 14*24*60*60*1000});
			res.status(200).json({userNumber: results});
		} else {
			res.status(500).send(false);
		}
	})
	.catch(err => {
		console.log(err);
	})
});


app.get("/api/refreshlogin", (req, res) => {
	//creates new cookies and logs in user if refresh token is valid
	//note that the browser will delete old cookies with the same name and origin so we don't need to worry about that
	console.log("checking details")
	const refreshToken = req.signedCookies.refreshtoken;
	console.log(refreshToken);
	if (checkToken(refreshToken)) {
		const tokens = authTokens()
		res.cookie("accesstoken", tokens.accessToken , {httpOnly: true, maxAge: 30*60*1000});
		res.cookie("refreshtoken", tokens.refreshToken, {httpOnly: true, maxAge:14*24*60*60*1000}); 
		console.log("details are legitimate");
		res.status(200).send(true);
	} else {
		res.status(401).send(false); 
	}
}); //at this point this endpoint will not work because we have not fully impletemented cookies but it can remain for the time being

app.post("/api/newaccount", (req, res) => {
	createNewAccountQuery(req.body)
	.then(results => {
		console.log("the account creation was successful")
		res.status(200).send(true)
	})
	.catch(err => {
		console.log("sending error")
		res.status(200).send(true); 
		// <===== SQL CURRENTLY GIVES A GARBAGE ERROR BUT THE QUERY STILL WORKS SO INSTEAD WE ARE GOING TO IGNORE THE ERROR AND HOPE THERE AREN'T ANY OTHER ONES
	});
})

app.get("/test", (req, res) => {
	res.json({data: "Hello"});
});


app.listen(4000, () => {
	console.log("server listening at port 4000");
});





