// Importing necessary modules
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

let result = ""
let resultArray = []

fs.readdir('./customers', 'utf-8', (err, data) => {
	if(err) {
		throw err
	} 
	for(var j = 0; j < data.length; j++) { 
		fs.readFile('./customers/' + data[j], 'utf-8', function(err2, file) {
			if(err2) {
				throw err2
			}
			var parsedData = JSON.parse(file)
			calcCompound(parsedData)
		})
	}
})

let calcCompound = (customer) => {
		customer.pension.endamount = {
		pessimistic: 	customer.finances.startcapital,
		average: 		customer.finances.startcapital,
		optimistic: 	customer.finances.startcapital
	}
	customer.pension.duration = (customer.pension.age - customer.age)
	for (let i = customer.pension.duration - 1; i >= 0; i--) {
		customer.pension.endamount.pessimistic 	+= (customer.finances.monthlyadd * 12)
		customer.pension.endamount.average 		+= (customer.finances.monthlyadd * 12)
		customer.pension.endamount.optimistic 	+= (customer.finances.monthlyadd * 12) 
		
		customer.pension.endamount.pessimistic 	*= customer.pension.interest.pessimistic
		customer.pension.endamount.average 		*= customer.pension.interest.average
		customer.pension.endamount.optimistic 	*= customer.pension.interest.optimistic
	}

		/*console.log("Welcome " + customer.name 	+ " to our advanced pension planner!")
		console.log("You are starting with " 	+ customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd )
		console.log("When you retire at age " 	+ customer.pension.age + " you will have the following: ")

		console.log("In a pessimistic scenario: €" 	+ prettyNr(customer.pension.endamount.pessimistic))
		console.log("In a average scenario: €" 		+ prettyNr(customer.pension.endamount.average))
		console.log("In a optimistic scenario: €" 	+ prettyNr(customer.pension.endamount.optimistic))*/

		let result = {
			name: customer.name,
			startcapital: customer.finances.startcapital,
			monthly: customer.finances.monthlyadd,
			pensionage: customer.pension.age,
			pessimistic: prettyNr(customer.pension.endamount.pessimistic),
			average: prettyNr(customer.pension.endamount.average),
			optimistic: prettyNr(customer.pension.endamount.optimistic)
		}
		console.log(result)
		resultArray.push(result)
		var makeJson = JSON.stringify(resultArray)
		fs.writeFile(__dirname + '/customerprojections.json', makeJson, function(mistake) {
			if(mistake) {
				throw mistake
			}
		})
}	

//store results in a variable

/* function Employee(result) {
	this.result = result 
}

var employee1 = new Employee('')
var employee2 = new Employee('')

arrayList.push(employee1)

JSON.stringify(arrayList) */
