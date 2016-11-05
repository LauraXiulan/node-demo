'use strict'
// const pg = require('pg') do not need to require postgres
const Sequelize = require('sequelize')
const db = new Sequelize('seqtest', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})
//('postgres://postgres:postgres@localhost/seqtest')
// const db = new sequelize('seqtest', 'postgres', 'postgres') can only use with mysql!
const express = require('express')
const app = express()

let Hat = db.define('hat', {
	name: Sequelize.STRING,
	material: Sequelize.STRING,
	height: Sequelize.INTEGER,
	brim: Sequelize.BOOLEAN
})

db.sync({force: true})
.then(() => {
	console.log("Database synced successfully")
	Promise.all([Hat.create({
		name: 'cowboy',
		material: 'straw',
		height: 4,
		brim: true
	}),
	Hat.create({
		name: 'The Secondary Hat',
		material: 'Moondust',
		height: 84,
		brim: false
	})
	]).then(hat => {
		console.log('Two hats made!')
	// 	Hat.findAll({
	// 		where: {
	// 			name: 'The Secondary Hat'
	// 		}
	// 	})
	// }).then(hat => {
	// 	console.log(hat)
	})
})

// (hat => {

// }) is the same as
// ((hat) =>)

app.get('/hats', (req, res) => {
	Hat.findAll().then((rows) => {
		let columnData = []
		for(let i = 0; i < rows.length; i++) {
			columnData.push(rows[i].dataValues)
			// let name = columData.name
			// let material = columData.material
			// let height = columData.height
			// let brim = columData.brim
			
		} res.send(columnData)
	})
})

app.listen(8000, () => {
	console.log("System running")
})