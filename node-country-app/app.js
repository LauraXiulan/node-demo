var fs = require('fs')
var country = require(__dirname + '/json-file-reader')

country(process.argv[2])

