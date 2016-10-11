console.log("Trying some stuff")

var fs = require("fs")

fs.readdir("./", function(err, data) {
	if(err) {
		console.log(err)
		throw err
	}
	console.log(data)
	for(var i=0; i < data.length; i++) { 
	fs.readFile(data[i], "utf-8", function(err, files) {
		if(err) {
			console.log(err)
			throw err
		} console.log(files)
	})
}
})

