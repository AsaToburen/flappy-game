var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipes');

var bird = require('./entities/bird');

//var counter = require('./entities/counter');


var FlappyBird = function() {

    // need to include goal below??
    this.entities = [new bird.Bird()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipes = new pipeSystem.PipeSystem(this.entities);
    //this.ui = new uiSystem.uiSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
    //this.ui.run();
};

exports.FlappyBird = FlappyBird;
