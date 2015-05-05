var CounterGraphicsComponent = function(entity) {
  this.entity = entity;
};

CounterGraphicsComponent.prototype.draw = function(context) {
    //var position = this.entity.components.physics.position;

  context.save();
  context.translate(0, 0);
  context.font = '48px serif';
  context.fillText('Score: ' + this.entity.scoreVariable, 0, 0);
  context.restore();


};


exports.CounterGraphicsComponent = CounterGraphicsComponent;
