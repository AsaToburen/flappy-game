var pipe = require('../entities/pipe');
var goal = require('../entities/goal');

var PipeSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.interval = null;
};

PipeSystem.prototype.pause = function() {
    // Stop the update loop
    if (this.interval != null) {
        window.clearInterval(this.interval);
        this.interval = null;
    }
};

PipeSystem.prototype.run = function() {

  this.interval = window.setInterval(this.tick.bind(this),
    2000 * 1);
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

    this.entities.push(new pipe.Pipe(position, size), new goal.Goal(position));

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

};

exports.PipeSystem = PipeSystem;

