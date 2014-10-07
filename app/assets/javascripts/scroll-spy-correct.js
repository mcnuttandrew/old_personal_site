setTimeout(function(){
	var dataCollect = $('body').data();
	var dataCollect = dataCollect["bs.scrollspy"];
	debugger;
	dataCollect.options.offset = 100;
	
	dataCollect.process();
	
}, 1000)