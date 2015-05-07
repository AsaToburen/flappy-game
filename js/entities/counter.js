var graphicsComponent = require("../components/graphics/counter");
//var physicsComponent = require("../components/physics/physics");
//var collisionComponent = require("../components/collision/counter");

var goal = require("./goal.js");

var Counter = function() {

  var graphics = new graphicsComponent.CounterGraphicsComponent(this);
  //var physics = new physicsComponent.PhysicsComponent(this);
  //var collision = new collisionComponent.CollisionComponent(this);

  this.components = {
    graphics: graphics
    //physics: physics
   // collision: collision
  };
};


exports.Counter = Counter;
