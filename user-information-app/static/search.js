//Function to set interval for requests, one every 300 milliseconds
var lastCall = 0
function timer() {
	var now = Date.now()
	console.log
	if(now - lastCall > 300) {
		lastCall = now
		return true
	} else {
		lastCall = now
		return false
	}
}

// for (var i = 200000000 - 1; i >= 0; i--) {
// 	console.log(timer())
// }

// var x = 12.00.00.000
// var y = 12.00.00.300

// 	y-x < 300
// true = return false
// false = return true

$(document).ready( function() {
	$("#user").keyup(function() {
		if(timer()) {
			console.log("I am true")
			if($("#user").val() == ""){
				$("#result").html(" ") //Empty the results
			} else {
				//Every input should sent a push request to the backend to compare with the database
				var inputData =	{
					input: $("#user").val()
				}
				var searchResult = []
				$.post("/search", inputData, function(res) {
					$("#result").html("")
					if(res.data.length === 0) {
						$("#result").html("User Not Found!")
					} else {
						for(var i = 0; i < res.data.length; i++) {
							$("#result").append(res.data[i].firstname + "\n" + res.data[i].lastname + ": " + res.data[i].email + "<br>")	
						}	
					}
				})
			}
		} else {console.log("I am false")}
	})
})
