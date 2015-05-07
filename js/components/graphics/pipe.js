var PipeGraphicsComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
};

var isEven = function(value) {
  if (value % 2 == 0)
    return true;
  else
    return false;
};

var madePipe = 0;

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x, position.y);
  var img = new Image();
  img.src = "./images/pipe.png";
  if (isEven(madePipe)) {
    context.scale(1, -1);
  } else {
    context.scale(1, 1);
  }
  madePipe++;

  context.drawImage(img, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
  context.restore();
 
};


exports.PipeGraphicsComponent = PipeGraphicsComponent;
