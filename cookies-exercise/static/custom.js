$(document).ready(function() {
	console.log('DOM Loaded')
	if (Cookies.get('visited') == undefined) {	//Or if(!Cookies.get('visited'))
		Cookies.set('visited', 'true')
		$('#container').html('<h1> WELCOME! </h1>')
		console.log('Undefined')
	}
	else {
		$('#container').html('<h1> WELCOME BACK! </h1>')
		console.log('Defined')
	}
})