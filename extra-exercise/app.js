"use strict"

const fs = require('fs')
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.static('static'))

app.get('/', (req, res) => {
	res.render('static')
})

app.post('/', (req,res) => {
	let info = req.body
	console.log(info)
	// let newPension = {
	// 	name: req.body.name,
	// 	age: req.body.age,
	// 	finances: {
	// 		startcapital: req.body.capital,
	// 		monthlyadd: req.body.add	
	// 	},
	// 	pension: {
	// 		age: req.body.pension,
	// 		interest: {
	// 			pessimistic: req.body.pessimistic,
	// 			average: req.body.average,
	// 			optimistic: req.body.optimistic
	// 		}
	// 	}	
	// }
	// let calCompound = (newPension) => {
	// 	newPension.pension.endamount = {
	// 		pessimistic: 	newPension.finances.startcapital,
	// 		average: 		newPension.finances.startcapital,
	// 		optimistic: 	newPension.finances.startcapital
	// 	}
	// 	newPension.pension.duration = (newPension.pension.age - newPension.age)
	// 	for (let i = newPension.pension.duration - 1; i >= 0; i--) {
	// 		newPension.pension.endamount.pessimistic 	+= (newPension.finances.monthlyadd * 12)
	// 		newPension.pension.endamount.average 		+= (newPension.finances.monthlyadd * 12)
	// 		newPension.pension.endamount.optimistic 	+= (newPension.finances.monthlyadd * 12) 
			
	// 		newPension.pension.endamount.pessimistic 	*= newPension.pension.interest.pessimistic
	// 		newPension.pension.endamount.average 		*= newPension.pension.interest.average
	// 		newPension.pension.endamount.optimistic 	*= newPension.pension.interest.optimistic
	// 	}

	// 	console.log("Welcome " + newPension.name 	+ " to our advanced pension planner!")
	// 	console.log("You are starting with " 	+ newPension.finances.startcapital + " and add a monthly amount of " + newPension.finances.monthlyadd )
	// 	console.log("When you retire at age " 	+ newPension.pension.age + " you will have the following: ")

	// 	console.log("In a pessimistic scenario: €" 	+ prettyNr(newPension.pension.endamount.pessimistic))
	// 	console.log("In a average scenario: €" 		+ prettyNr(newPension.pension.endamount.average))
	// 	console.log("In a optimistic scenario: €" 	+ prettyNr(newPension.pension.endamount.optimistic))
	// }
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




app.listen(8000, () => {
	console.log("Server running")
})



// 	let result = {
// 		name: customer.name,
// 		startcapital: customer.finances.startcapital,
// 		monthly: customer.finances.monthlyadd,
// 		pensionage: customer.pension.age,
// 		pessimistic: "€" + prettyNr(customer.pension.endamount.pessimistic),
// 		average: "€" + prettyNr(customer.pension.endamount.average),
// 		optimistic: "€" + prettyNr(customer.pension.endamount.optimistic)
// 	}
// 	resultArray.push(result)
// 	let makeJson = JSON.stringify(resultArray)
// 	fs.writeFile(__dirname + '/customerprojections.json', makeJson, (mistake) => {
// 		if(mistake) {
// 			throw mistake
// 		}
// 	})
// }