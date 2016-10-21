"use strict"

const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.static('static'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.render('static')
})

//Functions for calculation
let roundDecimal = (number) => {
	return Math.round(number * 100) / 100
}

let addCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

let prettyNr = (number) => {
	return addCommas(roundDecimal(number))
}

let result = ""
let resultArray = []

app.post('/', (req,res) => {
	let newPension = {
		name: req.body.name,
		age: Number(req.body.age),
		finances: {
			startcapital: Number(req.body.capital),
			monthlyadd: Number(req.body.add)
		},
		pension: {
			age: Number(req.body.pension),
			interest: {
				pessimistic: Number(req.body.pessimistic),
				average: Number(req.body.average),
				optimistic: Number(req.body.optimistic)
			}
		}
	}
	newPension.pension.endamount = {
		pessimistic: newPension.finances.startcapital,
		average: newPension.finances.startcapital,
		optimistic: newPension.finances.startcapital
	}
	newPension.pension.duration = (newPension.pension.age - newPension.age)
	for(let i = newPension.pension.duration - 1; i >= 0; i--) {
		newPension.pension.endamount.pessimistic += (newPension.finances.monthlyadd * 12)
		newPension.pension.endamount.average += (newPension.finances.monthlyadd * 12)
		newPension.pension.endamount.optimistic += (newPension.finances.monthlyadd * 12)

		newPension.pension.endamount.pessimistic *= newPension.pension.interest.pessimistic
		newPension.pension.endamount.average *= newPension.pension.interest.average
		newPension.pension.endamount.optimistic *= newPension.pension.interest.optimistic
	}
	let result = {
		name: newPension.name,
		startcapital: newPension.finances.startcapital,
		monthly: newPension.finances.monthlyadd,
		pensionage: newPension.pension.age,
		pessimistic: "€" + prettyNr(newPension.pension.endamount.pessimistic),
		average: "€" + prettyNr(newPension.pension.endamount.average),
		optimistic: "€" + prettyNr(newPension.pension.endamount.optimistic)
	}
	resultArray.push(result)
	res.render('result', {pension: resultArray})
})


app.listen(8000, () => {
	console.log("Server running")
})