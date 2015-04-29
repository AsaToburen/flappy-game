var collisionComponent = require("./rect");
var GoalCollisionComponent = function(entity, size) {
    collisionComponent.RectCollisionComponent.call(this, entity, size);
};

GoalCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

GoalCollisionComponent.prototype.onCollision = function(object) {
};

exports.GoalCollisionComponent = GoalCollisionComponent;


