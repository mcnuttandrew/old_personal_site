( function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "#04ff00";
  var RADIUS = 30;
  
  var Asteroid = window.Asteroids.Asteroid = function(pos, game){
    this.game = game;
    var vel = Asteroids.Util.prototype.randomVec(1);
    Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  }
	
  
  Asteroids.Util.prototype.inherits.call(Asteroid, Asteroids.MovingObject); 

})();