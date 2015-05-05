var GraphicsSystem = function(entities) {
  this.entities = entities;
  // Canvas is where we draw
  this.canvas = document.getElementById('main-canvas');
  // Context is what we draw to
  this.context = this.canvas.getContext('2d');

  this.paused = true;
};

GraphicsSystem.prototype.run = function() {
  // Run the render loop
  window.requestAnimationFrame(this.tick.bind(this));
  this.paused = false;
};

GraphicsSystem.prototype.pause = function() {
  this.paused = true;
};

GraphicsSystem.prototype.tick = function() {
  // Set the canvas to the correct size if the window is resized
  if (this.canvas.width != this.canvas.offsetWidth ||
    this.canvas.height != this.canvas.offsetHeight) {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  //every tick 1/60 clearing all rectangles off canvas and redrawing them...
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Rendering goes here
  this.context.save();
  this.context.translate(this.canvas.width / 2, this.canvas.height);
  this.context.scale(this.canvas.height, -this.canvas.height);

  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    if (!'graphics' in entity.components) {
      continue;
    }
    entity.components.graphics.draw(this.context);
  }

  this.context.restore();

  if (!this.paused) {
    // Continue the render loop
    window.requestAnimationFrame(this.tick.bind(this));
  }
};

exports.GraphicsSystem = GraphicsSystem;
