var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/pipe");
var graphicsComponent = require("../components/graphics/pipe");

var Pipe = function(position, size) {

  this.type = 'pipe';

  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);
  var collision = new collisionComponent.PipeCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  physics.position = position;
  physics.velocity.x = -0.4;

  var Pipe = function(position, size) {};

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Pipe.prototype.onCollision = function(entity) {

  if (entity.type && entity.type == 'endGoal') {

    this.remove = true;
  }
};

exports.Pipe = Pipe;
