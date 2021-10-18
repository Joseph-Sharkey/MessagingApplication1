import fetch from "node-fetch";
const url = "http://localhost:4000/test"
import express from "express";
const app = express()

fetch(url)
.then(response => {
	return response.json()
})
.then(data => {
	console.log(data);
})
.catch(err => {
	console.log(err)
})


app.listen(6000)