var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/bird");
var collisionComponent = require("../components/collision/circle");
var pipe = require("./pipe.js");
var goal = require("./goal.js");

var Bird = function() {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.y = 0.5;
  physics.acceleration.y = -2;

  var graphics = new graphicsComponent.BirdGraphicsComponent(this);
  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,
    graphics: graphics,
    collision: collision
  };
};

Bird.prototype.onCollision = function(entity) {
  
  console.log(entity);

  //console.log(entity instanceof goal);
  this.crash = true;
  

};

setTimeout(function() {
  debugger;
}, 15000);

exports.Bird = Bird;
