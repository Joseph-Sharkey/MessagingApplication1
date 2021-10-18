import fetch from "node-fetch";
const data = "hello"
const url = "http://localhost:5000/test"
import express from "express";
const app = express()
fetch(url, {method: "GET"})
.then(response => {
	console.log(response)
})
.catch(err => {
	console.log(err)
})


app.listen(6000)