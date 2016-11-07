'use strict'

const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

let app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/static'))

let db = new Sequelize('session', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
})

let User = db.define('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
})

app.use(session({
	secret: 'Oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}))

app.get('/', (req, res) => {
	res.render('index', {
		message: req.query.message,
		user: req.session.user
	})
})

app.get('/profile', (req, res) => {
	let user = req.session.user
	if(user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."))
	}
	else {
		res.render('profile', {
			user: user
		})
	}
})

app.post('/login', bodyParser.urlencoded({extended: true}), (req, res) => {
	if(req.body.email.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Please fill out your emailadress."))
		return
	}
	if(req.body.password.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Please fill out your password."))
		return
	}
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then((user) => {
		if(user !== null && req.body.password === user.password) {
			req.session.user = user
			res.redirect('/profile')
		}
		else {
			res.redirect('/?message=' + encodeURIComponent("Invalid email or password."))
		}
	}, (err) => {
		res.redirect('/?message=' + encodeURIComponent("Invalid email or password."))
	})
})

app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err) {
			throw err
		}
		res.redirect('/?message=' + encodeURIComponent("Successfully logged out."))
	})
})

db.sync({force: true}).then(() => {
	User.create({
		name: "Ducky",
		email: "yellow@ducky",
		password: "kwak"
	}).then(() => {
		let server = app.listen(8000, () => {
			console.log("Server is listening on: " + server.address().port)
		})
	})
}, (err) => {
	console.log('Sync failed: ')
	console.log(err)
})