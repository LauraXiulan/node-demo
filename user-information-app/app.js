'use strict'

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// app.get('/index', (req, res) => {
// 	response.send('Page opened')
// })

// app.get('/', (req, res) => {
// 	fs.readFile(__dirname + '/users.json', (err, data) => {
// 		if(err) throw err
// 		let parsedData = JSON.parse(data)
// 		res.render('index', {data: parsedData})
// 	})
// })

// app.get('/search', (req, res) => {
// 	// fs.readFile(__dirname + '/users.json', (err, data) => {
// 	// 	if(err) throw err
// 	// 	let parsedData = JSON.parse(data)
// 		res.render('search')
// 	})

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: false}))

// app.post('/search', (req, res) => {
// 	console.log(req.body.user.firstname)

// 	// fs.readFile(__dirname + '/users.json', (err, data) => {
// 	// 	if(err) throw err
// 	// 	let parsedData = JSON.parse(data)
// 	// 	for(let i = parsedData.length -1; i >= 0; i--) {
// 	// 		if(req.body.user.firstname == parsedData.firstname || parsedData.lastname) 
// 	// 		res.send('You searched for: ' + req.body.user.firstname)
// 	// 	}
// 	// })	
// })

//Add users form


app.get('/add', (req, res) => {
	res.render('add-user')
})

app.post('/add', (req, res) => {
	console.log(req.body.firstname)
	console.log(req.body.lastname)
	console.log(req.body.email)
	res.send('Post page')
})

app.listen(8000, () => {
	console.log('Server running')
})