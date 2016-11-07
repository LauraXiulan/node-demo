'use strict'

const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/static')) //Looks automatically for index in static (pug needs to be rendered with app.get!)

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(8000, () => {
	console.log('Server running')
})