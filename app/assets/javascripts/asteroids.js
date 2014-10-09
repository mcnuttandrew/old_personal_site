	debugger;
	
setTimeout(function(){	
	if(document.getElementById("game-canvas")){

		var canvasEl = document.getElementById("game-canvas"); 
		canvasEl.height = 1000; //DRY OUT
		canvasEl.width = 1000;
		var game = new Asteroids.Game();

		var gv = new Asteroids.GameView(
		  canvasEl.getContext("2d"), 
		  game
		);
		gv.start();
	}
},300)