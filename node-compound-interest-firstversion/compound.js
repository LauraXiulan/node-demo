const fs = require('fs')

let roundDecimal = (number) => {
	return Math.round(number * 100) / 100
}

let addCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

let prettyNr = (number) => {
	return addCommas(roundDecimal(number))
}

fs.readFile(__dirname + '/customer.json', 'utf-8', (err, data) => {
	let parsedData = JSON.parse(data)
	calcCompound(parsedData)
})

let calcCompound = (customer) => {
	for (var j = customer.length - 1; j >= 0; j--) {
		customer[j].pension.endamount = {
			pessimistic: 	customer[j].finances.startcapital,
			average: 		customer[j].finances.startcapital,
			optimistic: 	customer[j].finances.startcapital
		}
		customer[j].pension.duration = (customer[j].pension.age - customer[j].age)
		for (var i = customer[j].pension.duration - 1; i >= 0; i--) {
			customer[j].pension.endamount.pessimistic 	+= (customer[j].finances.monthlyadd * 12)
			customer[j].pension.endamount.average 		+= (customer[j].finances.monthlyadd * 12)
			customer[j].pension.endamount.optimistic 	+= (customer[j].finances.monthlyadd * 12) 
			
			customer[j].pension.endamount.pessimistic 	*= customer[j].pension.interest.pessimistic
			customer[j].pension.endamount.average 		*= customer[j].pension.interest.average
			customer[j].pension.endamount.optimistic 	*= customer[j].pension.interest.optimistic
		}

		console.log("Welcome " + customer[j].name 	+ " to our advanced pension planner!")
		console.log("You are starting with " 	+ customer[j].finances.startcapital + " and add a monthly amount of " + customer[j].finances.monthlyadd )
		console.log("When you retire at age " 	+ customer[j].pension.age + " you will have the following: ")

		console.log("In a pessimistic scenario: €" 	+ prettyNr(customer[j].pension.endamount.pessimistic))
		console.log("In a average scenario: €" 		+ prettyNr(customer[j].pension.endamount.average))
		console.log("In a optimistic scenario: €" 	+ prettyNr(customer[j].pension.endamount.optimistic))
	}
}

module.exports = fs.readFile