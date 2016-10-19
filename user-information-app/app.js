'use strict'

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/index', (req, res) => {
	response.send('Page opened')
})


//Show user list
app.get('/', (req, res) => {
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if(err) throw err
		let parsedData = JSON.parse(data)
		res.render('index', {data: parsedData})
	})
})



//Search users
app.get('/search', (req, res) => {
		res.render('search')
})

app.use(bodyParser.urlencoded({extended: false}))

app.post('/search', (req, res) => {
	let userSearch = req.body.search
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if(err) throw err
		let parsedData = JSON.parse(data)
		for(let i = 0; i < parsedData.length; i++) {
			if(userSearch == parsedData[i].firstname || userSearch == parsedData[i].lastname) {
			let user = []
			user.push(parsedData[i].firstname, parsedData[i].lastname, parsedData[i].email)
			res.render('result', {user: user})	
			}
		}
	})	
})


//Add users form
app.get('/add', (req, res) => {
	res.render('add-user')
})

app.post('/add', (req, res) => {
	let newUser = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email
	}
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if(err) throw err
		let parsedData = JSON.parse(data)
		parsedData.push(newUser)
		console.log(parsedData)	
		fs.writeFile(__dirname + '/users.json', JSON.stringify(parsedData, null, "\t"), (err) => {
			if(err) throw err
			res.redirect('/')
		})
		
	}) 
	
})

app.listen(8000, () => {
	console.log('Server running')
})