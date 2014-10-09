( function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
	
	var RADIUS = 6;
	var COLOR = "#FF0000"
	var Bullet = window.Asteroids.Bullet = function(game, pos, vel){	
		this.game = game; 	
		Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);
	}
	Asteroids.Util.prototype.inherits.call(Bullet, Asteroids.MovingObject); 
	
  Bullet.prototype.draw = function(ctx) {

    ctx.strokeStyle = this.color;
		ctx.rect(this.pos[0], this.pos[1], 6, 6);
		ctx.stroke();
    // ctx.stroke();
  };
	
	})();