const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')

let pass = process.argv[2]

bcrypt.hash(pass, null, null, (err, hash) => {
	fs.writeFile(__dirname + '/content.txt', hash, (err) => {
		if(err) {
			throw err
		}
	})
})