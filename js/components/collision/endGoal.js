var collisionComponent = require("./rect");
var pipeSystem = require('../../systems/pipes.js');
var game = require('../../flappy_bird.js');


var endGoalCollisionComponent = function(entity, size) {
    collisionComponent.RectCollisionComponent.call(this, entity, size);
};

endGoalCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

endGoalCollisionComponent.prototype.onCollision = function(object) {
  console.log('EndGoal Collision');
};

exports.endGoalCollisionComponent = endGoalCollisionComponent;


