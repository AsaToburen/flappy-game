var collisionComponent = require("./rect");
var pipeSystem = require('../../systems/pipes.js');


var endGoalCollisionComponent = function(entity, size) {
    collisionComponent.RectCollisionComponent.call(this, entity, size);
};

endGoalCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

endGoalCollisionComponent.prototype.onCollision = function(object) {
};

exports.endGoalCollisionComponent = endGoalCollisionComponent;


