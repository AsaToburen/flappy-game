var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  //context.beginPath();
  //context.arc(200, 80, 50, 0, 2 * Math.PI);
  context.fillStyle = '#455A64';
  //context.fill();

  context.beginPath();
  context.fillRect(500, 50, 340, 300);
  context.fillStyle = '#C2185B';
  context.stroke();


      var rectangle = new Path2D();
    rectangle.rect(200, 200, 50, 50);

    var circle = new Path2D();
    context.fillStyle = 'green';
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    context.stroke(rectangle);
    context.fill(circle);



};


exports.BirdGraphicsComponent = BirdGraphicsComponent;
