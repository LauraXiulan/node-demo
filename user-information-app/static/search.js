$(document).ready( () => {
	$("#user").keyup( () => {
		if($("#user").val() == ""){
			$("#result").html(" ")
		} else {
			//Every input should sent a push request to the backend to compare with the database
			var inputData =	{
				input: $("#user").val()
			}
			var searchResult = []
			$.post("/search", inputData, (res) => {
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
	})
})