var graphicsComponent = require("../components/graphics/endGoal");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/endGoal");
var pipeSystem = require("../systems/pipes.js");
var pipe = require("./pipe.js");

var endGoal = function() {

  console.log('EndGoal Created');

  var size = {
    x: 0.01,
    y: 1
  };

  var position = {
    x: -1.38,
    y: 1
  };

  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.endGoalGraphicsComponent(this, size);
  var collision = new collisionComponent.endGoalCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);


  physics.position = position;

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

endGoal.prototype.onCollision = function(entity) {
  
  this.remove = true;
  console.log(this);
  console.log(this.remove);
 
  if (typeof(this) == Object){
    console.log('equal to object');
  }
  console.log('EndGoal collision !!!!!!');
};






exports.endGoal = endGoal;
