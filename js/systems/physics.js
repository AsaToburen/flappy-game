var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.interval = null;
  this.time = null;
  this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
  this.interval = window.setInterval(this.tick.bind(this), 1000 / 60);
  this.time = new Date().getTime();
};

PhysicsSystem.prototype.pause = function() {
  // Stop the update loop
  if (this.interval != null) {
    window.clearInterval(this.interval);
    this.interval = null;
  }
};


PhysicsSystem.prototype.tick = function() {
  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    if (!'physics' in entity.components) {
      continue;
    }
    entity.components.physics.update(1 / 60);
  }
  this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
