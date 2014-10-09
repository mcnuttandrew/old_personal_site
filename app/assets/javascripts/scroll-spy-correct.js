setInterval(function(){
	if($(document).scrollTop() < 150){
		$(".sidebar").css("margin-top", 0)
	} else if($(document).scrollTop() < 400 && $(document).scrollTop() > 150) {
		$(".sidebar").css("margin-top", -($(document).scrollTop()) + "px")
	} else {
		$(".sidebar").css("margin-top", -400+ "px")
	}
}, 1);