var GoalGraphicsComponent = function(entity) {
  this.entity = entity;
};

GoalGraphicsComponent.prototype.draw = function(context) {
  
  var position = this.entity.components.physics.position;

  context.save();
  context.lineWidth = 0.01;
  context.beginPath();
  context.moveTo(position.x, position.y);
  context.lineTo(position.x, -position.y);
  context.globalAlpha = 0.0;
  context.strokeStyle = '#000';
  context.stroke();
  context.restore();

};


exports.GoalGraphicsComponent = GoalGraphicsComponent;
