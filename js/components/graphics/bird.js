var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
  this.radius = 0.02;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  var img = new Image();
  img.src = "images/bird_sprite.png";
  context.drawImage(img, 0, 0, 90, 90, 0, 0.2, 0.1, 0.1);
  //context.drawImage(img, 92, 0, 90, 100, .2, .2, .089, .1);
  //context.drawImage(img, 185, 0, 90, 100, .2, .2, .089, .1);
  context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
