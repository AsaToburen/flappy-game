var pipe = require('../entities/pipe');
var goal = require('../entities/goal');
var endGoal = require('../entities/endGoal');

var PipeSystem = function(main) {
  this.main = main;
  this.entities = main.entities;
  this.canvas = document.getElementById('main-canvas');
  this.interval = null;
};

PipeSystem.prototype.pause = function() {
  if (this.interval != null) {
    window.clearInterval(this.interval);
    this.interval = null;
  }
};

PipeSystem.prototype.run = function() {
  this.interval = window.setInterval(this.tick.bind(this), 2000 * 1);
};

PipeSystem.prototype.tick = function() {
  var right = 0.5 * this.canvas.width / this.canvas.height;
  var gapPosition = 0.4 + Math.random() * 0.2;

  var height = gapPosition - 0.15 / 2;
  var position = {
    x: right + 0.15 / 2,
    y: height / 2
  };

  var size = {
    x: 0.15,
    y: height
  };

  this.entities.push(new pipe.Pipe(position, size));

  var height = 1 - gapPosition - 0.2 / 2;
  var position = {
    x: right + 0.15 / 2,
    y: 1 - height / 2
  };

  var size = {
    x: 0.15,
    y: height
  };

  this.entities.push(new pipe.Pipe(position, size));

  var position = {
    x: right + 0.15,
    y: 1
  };

  var size = {
    x: 0.01,
    y: 1
  };

  this.entities.push(new goal.Goal(position, size));

  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];

    if (entity.remove) {
      this.entities.splice(i, 1);
    }
  }
};


exports.PipeSystem = PipeSystem;
