//Import modules
const sequelize = require('sequelize')
const express = require('express')
const app = express()

let db = new sequelize('relational', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

//Define database structure

//Define models
let User = db.define('user', {
	name: sequelize.STRING,
	email: {type: sequelize.STRING, unique: true}
})

let Hat = db.define('hat', {
	name: sequelize.STRING,
	brim: sequelize.BOOLEAN,
	height: sequelize.INTEGER,
	material: sequelize.STRING
})

//Define relations
User.hasMany(Hat)
Hat.belongsTo(User)

//Set express routes

app.get('/ping', (req, res) => {
	res.send('pong')
})

app.get('/hats', (req, res) => {
	Hat.findAll({
		include: [{
			model: User,
			attributes: ['name']
		}]
	}).then(hats => {
		res.send(hats)
	})
})

app.get('/users', (req, res) => {
	User.findAll({
		attributes: ['name'],
		include: [Hat]
	}).then(users => {
		res.send(users)
	})
})

db.sync({force: true}).then(db => {
	console.log("Synced, yay!")
	User.create({
		name: 'Mentor',
		email: 'mentor@palokaj.co'
	}).then(user => {
		user.createHat({
			name: 'Mentorhat',
			brim: true,
			height: 2,
			material: 'banana'
		})
	})
	User.create({
		name: 'Paul',
		email: 'paul@vanmotman.com'
	})
	Hat.create({
		name: 'Tophat',
		brim: true,
		height: 5,
		material: 'felt'
	})
	Hat.create({
		name: 'Downhat',
		brim: false,
		height: 1,
		material: 'feel'
	})
})

app.listen(8000, () => {
	console.log("Server is running!")
})