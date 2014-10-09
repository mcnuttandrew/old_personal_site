( function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameView = window.Asteroids.GameView = function(ctx, game){
    this.ctx = ctx;
    this.game = game;
  };
  
  GameView.prototype.start = function(){
    var that = this;
    that.bindKeyHandlers();
    setInterval(function (){
      that.game.step();
      that.game.draw(that.ctx);
    }, 30);
  };
  
  GameView.prototype.bindKeyHandlers = function(){
    var ship = this.game.ship;
    key("W", ship.power.bind(ship, -1));
    // key("S", ship.power.bind(ship, 1));
    key("A", ship.rotate.bind(ship, -1));
    key("D", ship.rotate.bind(ship, 1));
		key("F", ship.fireBullet.bind(ship));
		key("S", ship.breaking.bind(ship));
		var that = this;
		key("E", function(){
			console.log("hit");
			 that.game.shields = that.game.shields * -1;
		} );

  };
})();