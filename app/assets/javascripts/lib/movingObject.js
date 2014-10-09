( function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
	
  var MovingObject = window.Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color; 
  };
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], 
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
		// ctx.lineTo(this.pos[0] +10* this.vel[0],this.pos[1]+10* this.vel[1])
    ctx.stroke();
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var xVar = Math.pow((otherObject.pos[0] - this.pos[0]), 2);
    var yVar = Math.pow((otherObject.pos[1] - this.pos[1]), 2);
    var objDistance = Math.sqrt(xVar + yVar);
    var collided = (objDistance <= this.radius) || (objDistance <= otherObject.radius);
    if (collided === true){
    	this.collideWith(otherObject);
    }
  };
  
  MovingObject.prototype.collideWith = function(otherObject){
    if ((this instanceof Asteroids.Bullet) && (otherObject instanceof Asteroids.Asteroid) ) {
      
			otherObject.game.remove(this);
			otherObject.game.remove(otherObject);	
    }
		if (!(this instanceof Asteroids.Bullet) && otherObject instanceof Asteroids.Ship ) {
      otherObject.relocate();
    }
  };
  
  MovingObject.prototype.move = function(dir) {
		if(this instanceof Asteroids.Asteroid){
			if(Math.abs(this.vel[0]) > 3){
				this.vel[0] =  this.vel[0]/Math.abs(this.vel[0])
			}
			if(Math.abs(this.vel[1]) > 3){
				this.vel[1] = this.vel[1]/Math.abs(this.vel[1])
			}
		}
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
		if(this instanceof Asteroids.Bullet){
    	if(this.game.isOutOfBounds(this.pos)){
    		this.game.remove(this);
    	}
		} else {
			this.pos = this.game.wrap(this.pos);   
		}
  };
  

})();