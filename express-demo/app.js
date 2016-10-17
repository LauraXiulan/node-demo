const express = require('express')
const app = express()

app.get('/', (request, response) => {
	response.status(418)
	response.send('Hello Laura, it is so good to see you in the browser!')
})

app.listen(8000, () => {
	console.log('I am listening')
})
