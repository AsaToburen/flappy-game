var collisionComponent = require("./rect");
var PipeCollisionComponent = function(entity, size) {
    collisionComponent.RectCollisionComponent.call(this, entity, size);
};

PipeCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

PipeCollisionComponent.prototype.onCollision = function(object) {
};

exports.PipeCollisionComponent = PipeCollisionComponent;
