var InputSystem = function(main) {
  this.main = main;
  this.entities = main.entities;
  this.canvas = document.getElementById('main-canvas');
  this.clickListener = null;
};

InputSystem.prototype.init = function() {
  this.canvas.addEventListener('click', this.onClick.bind(this));
  window.addEventListener('keydown', this.onKeypress.bind(this));
  //this.canvas.addEventListener('touchstart', this.onClick.bind(this));
};

InputSystem.prototype.pause = function() {
  //this.canvas.removeEventListener('click', this.clickListener);
  //this.clickListener = null;
};

InputSystem.prototype.onClick = function() {
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.6;
};

InputSystem.prototype.onKeypress = function(e) {
  if (e.keyCode == 32) {
    if (this.main.paused) {
      this.main.run();
    } else {
      this.main.pause();
    }
  }
};

exports.InputSystem = InputSystem;
