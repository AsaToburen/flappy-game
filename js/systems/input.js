var InputSystem = function(entities) {

  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  
   this.clickListener = null;
};

InputSystem.prototype.run = function() {
  this.canvas.addEventListener('click', this.onClick.bind(this));
  this.canvas.addEventListener('touchstart', this.onClick.bind(this));

};

InputSystem.prototype.pause = function() {
    this.canvas.removeEventListener('click', this.clickListener);
    this.clickListener = null;
};

InputSystem.prototype.onClick = function() {
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.6;
};

exports.InputSystem = InputSystem;
