var fs = require('fs')
var jsonData = ""

function readFile(name) {
	fs.readFile(__dirname + '/countries.json', 'utf-8', function(err, data) {
	if(err) {
		throw err
	}
	jsonData = JSON.parse(data)

	for(var i = 0; i<jsonData.length; i++) {
		if(name == jsonData[i].name) {
			console.log("Country: " + jsonData[i].name)
			console.log("Top Level Domain: " + jsonData[i].topLevelDomain)
		}
	}
	})
}

module.exports = readFile