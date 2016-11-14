const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')

let pass = process.argv[2]

fs.readFile(__dirname + '/content.txt', 'utf-8', (err, data) => {
	if (err) {
		throw err
	}
	var hash = data
	bcrypt.compare(pass, hash, (err, res) => {
		console.log(pass)
		console.log(hash)
		console.log(res)
	})
})