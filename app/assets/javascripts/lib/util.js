( function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = window.Asteroids.Util = function () {};
  
  Util.prototype.inherits = function (BaseClass) {
    function Surrogate () {}
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();
  };
  
  //is this right?
  Util.prototype.randomVec = function(lngth) {
    var tau =  2 * Math.PI;
    var xArg = tau * Math.random();
    var yArg = tau * Math.random();
    return [lngth * Math.sin(xArg), lngth * Math.cos(yArg)];
  };

})();