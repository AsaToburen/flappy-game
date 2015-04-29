var GoalGraphicsComponent = function(entity) {
  this.entity = entity;
};

GoalGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.moveTo(0, 1);
  context.lineTo(-1, 2);
  context.strokeStyle = '#000';
  context.stroke();
  context.restore();
};


exports.GoalGraphicsComponent = GoalGraphicsComponent;
