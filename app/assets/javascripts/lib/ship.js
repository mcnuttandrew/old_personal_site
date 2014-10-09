(function () {
		if (typeof window.Asteroids === "undefined") {
		  window.Asteroids = {};
		}

		var RADIUS = 15; 
		var COLOR = "#999999";
				// var COLOR = "#000000";

		var Ship = window.Asteroids.Ship = function(game) {
		  this.game = game;
			this.dir = Math.PI/2;//theta out of two Pi
		  var pos = [200, 200];
		  var vel = [0, 0];
		  Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);
		};

		Asteroids.Util.prototype.inherits.call(Ship, Asteroids.MovingObject);

		Ship.prototype.relocate = function() {
		  this.pos = this.game.randomPosition();
		  this.vel = [0, 0]; 
		}
		
		Ship.prototype.power = function(impulse){
		  this.vel[0] += impulse * Math.cos(this.dir);
		  this.vel[1] += impulse * Math.sin(this.dir);
			console.log(this.vel)
		}
		
		Ship.prototype.breaking = function() {
		  this.vel[0] = this.vel[0]/3;
			this.vel[1] = this.vel[1]/3; 
		}
		
		Ship.prototype.rotate = function(dir){
			this.dir += dir * Math.PI/6
		}

		Ship.prototype.fireBullet = function(){
			var magnitude = Math.sqrt(this.vel[0] * this.vel[0] + this.vel[1] * this.vel[1])
			if (magnitude === 0) {
				magnitude = 1
			}
			var direction = this.dir + Math.PI
			var velX =  (magnitude + 2)* Math.cos(direction);
			var velY =  (magnitude + 2) * Math.sin(direction);
			
			var newPos = [this.pos[0], this.pos[1]];
			var newVel = [velX, velY];
			var newBullet = new Asteroids.Bullet(this.game, newPos, newVel);
			this.game.add(newBullet);
		}
		
	  Ship.prototype.draw = function(ctx) {
	    ctx.strokeStyle = COLOR;
	    ctx.beginPath();
	    ctx.arc(
	      this.pos[0], 
	      this.pos[1],
	      this.radius,
	      this.dir - Math.PI/2,
	      this.dir + Math.PI/2,
	      true
	    );
	    ctx.stroke();
			if(this.game.shields > 0){
		    ctx.beginPath();
		    ctx.arc(
		      this.pos[0], 
		      this.pos[1],
		      50,
		      0,
		      Math.PI * 2,
		      true
		    );
		    ctx.stroke();
			}
	  };
  
})();