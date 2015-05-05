var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/pipe");

var Pipe = function(position, size) {

  console.log('Creating Pipe entity');

  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);
  var collision = new collisionComponent.PipeCollisionComponent(this, size);

  physics.position = position;
  physics.velocity.x = -0.4;

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Pipe.prototype.onCollision = function(entity) {
// console.log(entity);
//   console.log(typeof(this));
// }
// if (typeof(this) == 'endGoal') {
//   this.flag = true;
// }
};

exports.Pipe = Pipe;
