var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipes');
var bird = require('./entities/bird');
var endGoal = require('./entities/endGoal');
var counter = require('./entities/counter');

var FlappyBird = function() {

  this.entities = [new bird.Bird(this), new counter.Counter(this), new endGoal.endGoal()];
  this.graphics = new graphicsSystem.GraphicsSystem(this);
  this.physics = new physicsSystem.PhysicsSystem(this);
  this.input = new inputSystem.InputSystem(this);
  this.pipes = new pipeSystem.PipeSystem(this);
  this.input.init();

  this.score = 0;
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.pipes.run();
};

FlappyBird.prototype.pause = function() {
  this.graphics.pause();
  this.physics.pause();
  this.pipes.pause();
};

FlappyBird.prototype.addScore = function() {
  this.score++;
  console.log('Goal Passed', this.score);
};

exports.FlappyBird = FlappyBird;
