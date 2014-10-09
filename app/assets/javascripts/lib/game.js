( function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var DIM_X = 1000;
  var DIM_Y = 680;
  var NUM_ASTEROIDS = 15;
	
  var Game = window.Asteroids.Game = function() {
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship(this);
		this.shields = -1;
    this.bullets = [];
  };
  
  
  Game.prototype.addAsteroids = function() {
    var allAsteroids = [];
    for (var i = 0; i < NUM_ASTEROIDS; i++){
      allAsteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    }
    return allAsteroids; 
  };
  
  Game.prototype.wrap = function(pos) {
    var newPos = pos; 
    if(newPos[0] < 0){
      newPos[0] = DIM_X - Math.abs(newPos[0]) ;
    }
    if(newPos[0] >= DIM_X){
      newPos[0] =  newPos[0]%DIM_X;
    }
    if(newPos[1] < 0){
      newPos[1] = DIM_Y - Math.abs(newPos[1]) ;
    }
    if(newPos[1] >= DIM_Y){
      newPos[1] =  newPos[1]%DIM_Y;
    }
    return newPos;
  };
 
  
  Game.prototype.randomPosition = function() {
    var xPos = Math.floor(Math.random() * DIM_X);
    var yPos = Math.floor(Math.random() * DIM_Y);
    return [xPos, yPos];
  };
  
  Game.prototype.draw = function(ctx) {
		if(this.asteroids.length > 0 ){
	    ctx.clearRect(0, 0, DIM_X, DIM_Y);
			ctx.fillStyle = "#000000";
			ctx.rect(0, 0, DIM_X + 30, DIM_Y + 30);
			ctx.fill();
		} else {
			this.ship.vel[0] += 1
			this.ship.vel[1] += 1
			this.ship.dir += .2
			this.ship.fireBullet();
		}

		ctx.fillStyle = "#444444";
		ctx.font='900 350px Helvetica';
		if(this.asteroids.length < 10){
			ctx.fillText(" "+ this.asteroids.length, 0,DIM_Y)
		} else {
			ctx.fillText(this.asteroids.length, 0,DIM_Y)
		}
    var objs = this.allObjects();
    for (var i = 0; i < objs.length; i++){
      objs[i].draw(ctx);
    }
  };
  
  Game.prototype.moveObjects = function() {
		this.getForces(this.asteroids);
		var objs = this.allObjects()
    for (var i = 0; i < objs.length; i++){ 
      objs[i].move();
    }	
  };
	
  //flocking algorithm
	Game.prototype.getForces = function(boids){
		for(var i = 0; i < boids.length; i++){
			if(this.asteroids.length > 1){
				var v1 = this.ruleOne(boids, boids[i]);
				var v2 = this.ruleTwo(boids, boids[i]);
			} else {
				var v1 = [0,0]
				var v2 = [0,0]
			}

			if(this.asteroids.length > 2){
				var v3 = this.ruleThree(boids, boids[i]);
			} else {
				var v3 = [0,0]
			}
			if(this.shields > 0){
				var v4 = this.ruleFour(boids, boids[i]);
			} else {
				var v4 = [0,0];
			}
			// console.log(v1, v2, v3, v4);
		
			boids[i].vel[0] += v1[0] + v2[0] + v3[0] + v4[0];
			boids[i].vel[1] += v1[1] + v2[1] + v3[1] + v4[1];
		}
	}
	
	//move towards average
	Game.prototype.ruleOne = function(boids, boid){
		var avg = [0,0];
		for(var i = 0; i < boids.length; i++){

			if(boid !== boids[i]){
				avg[0] += boids[i].pos[0];
				avg[1] += boids[i].pos[1];
			}
		}
		
		avg[0] = avg[0] / (boids.length - 1);
		avg[1] = avg[1] / (boids.length - 1);
		
		return [(avg[0] - boid.pos[0])/5000, (avg[1] - boid.pos[1])/10000]
	}
	
	//keep away from other boids
	Game.prototype.ruleTwo = function(boids, boid){
		// debugger;
		var c = [0,0];
		for(var i = 0; i < boids.length; i++){
			if(boids[i] !== boid){
				var xDiff = boid.pos[0] - boids[i].pos[0];
				var yDiff = boid.pos[1] - boids[i].pos[1];
				
				if(Math.sqrt(xDiff * xDiff + yDiff * yDiff) < 30){
					// console.log([xDiff, yDiff]);
					c[0] = c[0] + (boid.pos[0] - boids[i].pos[0])*100;
					c[1] = c[1] + (boid.pos[1] - boids[i].pos[1])*100;
				}
			}
		}
		return [c[0], c[1]];
	}
	
	//match nearby velocity
	Game.prototype.ruleThree = function(boids, boid){
		var c = [0,0];
		for(var i = 0; i < boids.length; i++){
			if(boid !== boids[i]){
				c[0] += boid.vel[0];
				c[1] += boid.vel[1];
			}
		}
		c[0] = c[0]/(boids.length - 2);
		c[1] = c[1]/(boids.length - 2);
		// console.log([(c[0]-boid.vel[0])/8, (c[1]-boid.vel[1])/8])
		
		return [(c[0]-boid.vel[0])* 4, (c[1]-boid.vel[1]) * 4];
	}
	
	//keep away form predators
	Game.prototype.ruleFour = function(boids, boid){
		var c = [0,0];
		var xDiff = boid.pos[0] - this.ship.pos[0];
		var yDiff = boid.pos[1] -this.ship.pos[1];
				
		if(Math.sqrt(xDiff * xDiff + yDiff * yDiff) < 100){
			c[0] = c[0] + (boid.pos[0] - this.ship.pos[0]);
			c[1] = c[1] + (boid.pos[1] - this.ship.pos[1]);
		}

		return [c[0], c[1]];
	}
	
  Game.prototype.allObjects = function(){
    var collect = [this.ship].concat(this.asteroids).concat(this.bullets);
    return collect;
  };
  
  Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
  };
  
  Game.prototype.remove = function(obj){
		var grabList = [];
		if(obj instanceof Asteroids.Asteroid){
			grabList = this.asteroids;
		} else {
			grabList = this.bullets;
		}
    for(var i = 0; i < grabList.length; i++){
      if (grabList[i] === obj){
        grabList.splice(i, 1);
      }
    }
  };
  
  Game.prototype.checkCollisions = function(){
    var objs = this.allObjects();
    for (var i = 0; i < objs.length; i++){ 
      for (var j = 0; j < objs.length; j++){ 
        if(i !== j){
          objs[i].isCollidedWith(objs[j]);
        }
      }
    }
  };
  
	Game.prototype.add = function(bullet){
		this.bullets.push(bullet);		
	} //refactor out old code later
	
	Game.prototype.isOutOfBounds = function(pos){ 
		if (pos[0] < 0 || pos[0] > DIM_X){
			return true
		} else if(pos[1] < 0 || pos[1] > DIM_Y){
			return true
		} else {
			return false
		}
	}
  
})();