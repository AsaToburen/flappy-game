var graphicsComponent = require("../components/graphics/goal");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/goal");

var Goal = function(position, size) {


  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.GoalGraphicsComponent(this, size);
  var collision = new collisionComponent.GoalCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  physics.position = position;
  physics.velocity.x = -0.4;

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Goal.prototype.onCollision = function(entity) {
  
   
};

exports.Goal = Goal;
