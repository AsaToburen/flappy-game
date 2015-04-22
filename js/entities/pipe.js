var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");


var Pipe = function(position, size) {

  console.log('Creating Pipe entity');

  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);

  physics.position.x = 0;
  physics.velocity.x = -0.4;

  this.components = {
    graphics: graphics,
    physics: physics
  };
};

exports.Pipe = Pipe;
