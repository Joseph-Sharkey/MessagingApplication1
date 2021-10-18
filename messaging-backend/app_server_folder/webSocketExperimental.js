// this is not being used so ignore for time being 
const express = require("express");
const ws = require("ws");
const app = express();
const port = 5000;

const wsServer = new ws.Server({noServer: true});
wsServer.on("connection", socket => {
	socket.on("message", message => {
		console.log(message);
		ws.send("hello you send " + message);
	});
	ws.send("hello this is the websocket server and it is working properly right now so that is quite nice to be honest")
})

const server = app.listen(port, () => {
	console.log("listening on port " + port);
});

server.on("upgrade", (request, socket, head) => {
	wsServer.handleUpgrade(request, socket, head, socket => {
		wsServer.emit("connection", socket, request);
	});
});