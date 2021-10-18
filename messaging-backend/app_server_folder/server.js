const express = require("express");
const app = express();
const port = 5000
const jwt = require("jsonwebtoken") // <==== jwt verification will be used to check that the user is valid
const cors = require("cors")

const findUser = require("./controllers/findUser");
const createNewUser = require("./controllers/createNewUser"); 
const findUserChats = require("./controllers/findUserChats"); 
const findUserChatData = require("./controllers/findUserChatData"); 
const sendNewText = require("./controllers/sendNewText"); 
const createChat = require("./controllers/createChat"); //this function will not be accessed directly through the api 
const acceptFriendRequest = require("./controllers/acceptFriendRequest");
const checkFriendRequest = require("./controllers/checkFriendRequests"); //this is all of the current endpoints we need to write so far 
const findChatMembers = require("./controllers/findChatMembers");
const getNewMessages = require("./controllers/getNewMessages")
const createFriendRequest = require("./controllers/createFriendRequest");
const addChatMember = require("./controllers/addChatMember");
const deleteFriendRequest = require("./controllers/deleteFriendRequest");
const findChatDetails = require("./controllers/findChatDetails");
const sendChatFriendRequests = require("./controllers/sendChatFriendRequests");
const corsOptions = {
	origin: ["http://localhost:3000"],
	optionSuccessStatus: 200,
	credentials: true
} // <=== add this in a sec but not right now
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
	res.status(200).json("hello")
})

app.get("/api/findUser", (req, res) => {
	const userNumber = req.query.userNumber;
	console.log("finding user")
	findUser(userNumber)
	.then(data => {
		if (data) {
			res.status(200).send(data)
		} else {
			res.status(500).send(false)
		}
	})
	.catch(err => {
		res.status(500).send(false)
	});
}); 

app.post("/api/createFriendRequest", (req, res) => {
	const userNumber = req.body.userNumber
	const requestedNumber= req.body.requestedNumber;
	const proposedChatName = req.body.proposedChatName;
	const proposedChatDescription = req.body.proposedChatDescription;
	createFriendRequest(userNumber, requestedNumber, proposedChatName, proposedChatDescription, false)
	.then(response => {
		res.status(200).send(true);
	})
	.catch(err => {
		console.log(err);
		res.status(500).send(false)
	})
}); //we also need to add a chat number parameter so users can be added to pre existing chats


app.get("/api/findChatMembers", (req, res) => {
	const chatNumber = req.query.chatNumber
	findChatMembers(chatNumber)
	.then(data =>{ 
		res.status(200).json({data: data});
	})
	.catch(err =>  {
		console.log(err);
		res.status(500).send(false);
	});
}); // <=== FIXED

app.post("/api/createNewUser", (req, res) => {
	//this will take the foreign key send back from the auth database and store it here in this database so when the user is authenticated on the other database, they can use
	//that key to find their data here
	const userName = req.body.username;
	const description = req.body.description;
	const userNumber = req.body.userNumber;
	createNewUser(userName, description, userNumber)
	.then(response => {
		res.status(200).send(true);
	})
	.catch(err => {
		console.log(err);
		res.status(500).send(false);
	});
}); // <=== FIXED

app.get("/api/findUserChats", (req, res) => {
	const userNumber = req.query.userNumber
	findUserChats(userNumber)
	.then(data => {
		return findChatDetails(data)
	})
	.then(dataObject => {
		res.status(200).json(dataObject)
	})
	.catch(err => {
		console.log(err);
		res.status(500).send(false);
	});
}); // <== FIXED

app.get("/api/findUserChatData", (req, res) => {
	const chatNumber = req.query.chatNumber;
	findUserChatData(chatNumber)
	.then(data => {
		res.status(200).json({data: data})
	})
	.catch(err => {
		console.log(err);
		res.status(500).send(false);

	});
}); // <=== FIXED

app.post("/api/sendNewText", (req, res) => {
	const message = req.body.message
	const userNumber = req.body.userNumber
	const chatNumber = req.body.chatNumber
	sendNewText(message, userNumber, chatNumber)
	.then(data => {
		res.status(200).send(true)
	})
	.catch(err => {
		console.log(err);
		res.status(500).send(false);
	})
}); // <=== FIXED

const createGroupChat= require("./controllers/createGroupChat");
app.post("/api/sendChatFriendRequests", (req,res) => {
	const userNumber = req.body.userNumber;
	const requestedNumbers = req.body.requestedNumbers;
	const chatName = req.body.chatName;
	const chatDescription = req.body.chatDescription;
	createGroupChat(userNumber, chatName, chatDescription)
	.then(responseData => {
		return sendChatFriendRequests(userNumber, requestedNumbers, chatName, chatDescription, responseData)
	})
	.then(response => {
		res.status(200).send(true);
	})
	.catch(err => {
		console.log(err);
		res.status(500).send(false);
	});
});

app.post("/api/createChat", (req, res) => {
	const chatNumber = req.body.chatNumber // <=== this is important because this has to be the friend request id otherwise this will not work
	const userNumbers = req.body.userNumbers;
	const chatName = req.body.chatName;
	const chatDescription = req.body.chatDescription;
	console.log("chatName: " + chatName);
	console.log("chatDescription: " + chatDescription);
	createChat(chatNumber, userNumbers, chatName, chatDescription)
	.then(response => {
		res.status(200).send(true);
	})
	.catch(err => {
		console.log(err);
		res.status(500).send(false);
	});
}); 
/*
when user is creating chat
they need to send the request id from the friend request at the time
this will be used as the chat_key, allowing other users to later be added by sending requests with the same chat number 
the reason for this is that when group chats are being created, all of the users will not end up creating the same chat 

this means that we cannot delete friend requests otherwise all our group chats will end up with the same chat_key
therefore we need to add a new column to the friend request table called 'accepted' which will be changed to true and checked later
0 will be false and 1 will be true 
*/

const acceptGroupChatRequest = require("./controllers/acceptGroupChatRequest");
const e = require("cors");
app.get("/api/acceptFriendRequest", (req, res) => {
	console.log("accepting friend request")
	const to_user = req.query.to_user;
	const from_user = req.query.from_user; // if isGroupChat is true, this number will be the primary key of a chat, meaning a user will need to be added to that chat
	const isGroupChat = req.query.isGroupChat;
	console.log(to_user);
	console.log(from_user);
	console.log(isGroupChat);
	if (isGroupChat === true) {
		acceptGroupChatRequest(to_user, from_user)
		.then(response => {
			res.status(200).send("this is not correct ")
		})
		.catch(err => {
			console.log(err)
		})
	} else {
		acceptFriendRequest(from_user, to_user)
		.then(response => {
			res.status(200).send({data: response});
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(false);
		})
	}
}); // <=== THIS HAS BEEN FIXED SO NOW IF THE REQUEST IS FROM A GROUP CHAT, THE FROM_USER WILL BE A CHAT NUMBER BUT ON THE FRONTEND THE DATA HAS TO BE MODIFIED AND ALSO CHECK THE CREATE GROUP CHAT FUNCTION 

app.get("/api/checkFriendRequest", (req, res) => {
	const userNumber = req.query.userNumber;
	checkFriendRequest(userNumber)
	.then(response => {
		res.status(200).json({data: response});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
}); // <== FIXED



app.get("/api/getNewMessages", (req, res) => {
	const chatNumber = req.query.chatNumber;
	const highestId = req.query.highestId
	getNewMessages(chatNumber, highestId)
	.then(response => {
		if (response) {
			res.status(200).json({data: response})
		} else {
			res.status(500).send(false)
		}
	})
}) // <== FIXED

app.post("/api/addChatMember", (req, res) => {
	const userNumber= req.body.userNumber
	const chatNumber = req.body.chatNumber
	addChatMember(userNumber, chatNumber)
	.then(response => {
		res.status(200).send(true);
	})
	.catch(err => {
		res.status(500).send(false);
	})
})

app.post("/api/deleteFriendRequest", (req, res) => {
	const userNumber = req.body.userNumber;
	const fromUser = req.body.fromUser;
	deleteFriendRequest(userNumber, fromUser)
	.then(response => {
		res.status(200).send(true)
	})
	.catch(err => {
		res.status(500).send(false)
	});
});

app.get("/test", (req, res) => {
	res.status(200).json({data: "hello"})
});


app.listen(port, () => {
	console.log("listening on port " + port)
});

