var collisionComponent = require("./rect");
var GoalCollisionComponent = function(entity) {
    collisionComponent.RectCollisionComponent.call(this, entity);
};

GoalCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

GoalCollisionComponent.prototype.onCollision = function(object) {
};

exports.GoalCollisionComponent = GoalCollisionComponent;


