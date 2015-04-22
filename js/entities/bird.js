var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");

var Bird = function() {
  
  console.log("Creating Bird entity");
  
  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.BirdGraphicsComponent(this);

  physics.position.y = 0.5;
  physics.acceleration.y = -2.5;

  this.components = {
    graphics: graphics,
    physics: physics,
  };
};

exports.Bird = Bird;
