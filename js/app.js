(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();
  app.run();
});



},{"./flappy_bird":18}],2:[function(require,module,exports){
var util = require('../../util');

var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: util.clamp(positionA.x, positionB.x - sizeB.x / 2,
                                   positionB.x + sizeB.x / 2),
        y: util.clamp(positionA.y, positionB.y - sizeB.y / 2,
                                   positionB.y + sizeB.y / 2)
    };

    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;

},{"../../util":24}],3:[function(require,module,exports){
var collisionComponent = require("./rect");
var pipeSystem = require('../../systems/pipes.js');


var endGoalCollisionComponent = function(entity, size) {
    collisionComponent.RectCollisionComponent.call(this, entity, size);
};

endGoalCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

endGoalCollisionComponent.prototype.onCollision = function(object) {
};

exports.endGoalCollisionComponent = endGoalCollisionComponent;



},{"../../systems/pipes.js":23,"./rect":6}],4:[function(require,module,exports){
var collisionComponent = require("./rect");
var GoalCollisionComponent = function(entity, size) {
    collisionComponent.RectCollisionComponent.call(this, entity, size);
};

GoalCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

GoalCollisionComponent.prototype.onCollision = function(object) {
};

exports.GoalCollisionComponent = GoalCollisionComponent;



},{"./rect":6}],5:[function(require,module,exports){
var collisionComponent = require("./rect");

var PipeCollisionComponent = function(entity, size) {
    collisionComponent.RectCollisionComponent.call(this, entity, size);
};

PipeCollisionComponent.prototype = Object.create(
    collisionComponent.RectCollisionComponent.prototype
);

PipeCollisionComponent.prototype.onCollision = function(object) {
};

exports.PipeCollisionComponent = PipeCollisionComponent;



},{"./rect":6}],6:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x - sizeA.x / 2;
    var rightA = positionA.x + sizeA.x / 2;
    var bottomA = positionA.y - sizeA.y / 2;
    var topA = positionA.y + sizeA.y / 2;

    var leftB = positionB.x - sizeB.x / 2;
    var rightB = positionB.x + sizeB.x / 2;
    var bottomB = positionB.y - sizeB.y / 2;
    var topB = positionB.y + sizeB.y / 2;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],7:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
  this.radius = 0.02;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  var img = new Image();
  img.src = "images/bird_sprite.png";
  context.drawImage(img, 0, 0, 90, 90, 0, 0, 0.04, 0.04);
  //context.drawImage(img, 92, 0, 90, 100, .2, .2, .089, .1);
  //context.drawImage(img, 185, 0, 90, 100, .2, .2, .089, .1);
  context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;


},{}],8:[function(require,module,exports){
var CounterGraphicsComponent = function(entity) {
  this.entity = entity;
};

CounterGraphicsComponent.prototype.draw = function(context) {

  context.save();
  context.translate(-.95, .95);
  context.font = '48px serif';
  context.fillText('Score: ' + this.entity.scoreVariable, 0, 0);
  context.restore();

};


exports.CounterGraphicsComponent = CounterGraphicsComponent;

},{}],9:[function(require,module,exports){
var endGoalGraphicsComponent = function(entity) {
  this.entity = entity;
};

endGoalGraphicsComponent.prototype.draw = function(context) {
  
  var position = this.entity.components.physics.position;

  context.save();
  context.lineWidth = 0.01;
  context.beginPath();
  context.moveTo(position.x, position.y);
  context.lineTo(position.x, -position.y);
  //context.globalAlpha = 0.0;
  context.strokeStyle = 'red';
  context.stroke();
  context.restore();
};


exports.endGoalGraphicsComponent = endGoalGraphicsComponent;

},{}],10:[function(require,module,exports){
var GoalGraphicsComponent = function(entity) {
  this.entity = entity;
};

GoalGraphicsComponent.prototype.draw = function(context) {
  
  var position = this.entity.components.physics.position;

  context.save();
  context.lineWidth = 0.01;
  context.beginPath();
  context.moveTo(position.x, position.y);
  context.lineTo(position.x, -position.y);
  context.globalAlpha = 0.0;
  context.strokeStyle = '#000';
  context.stroke();
  context.restore();

};


exports.GoalGraphicsComponent = GoalGraphicsComponent;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
var PhysicsComponent = function(entity) {
  this.entity = entity;

  this.position = {
    x: 0,
    y: 0
  };
  this.velocity = {
    x: 0,
    y: 0
  };
  this.acceleration = {
    x: 0,
    y: 0
  };
};

PhysicsComponent.prototype.update = function(delta) {
  this.velocity.x += this.acceleration.x * delta;
  this.velocity.y += this.acceleration.y * delta;

  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
  console.log(this);
};

exports.PhysicsComponent = PhysicsComponent;

},{}],13:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/bird");
var collisionComponent = require("../components/collision/circle");
var pipe = require("./pipe.js");
var goal = require("./goal.js");

var Bird = function(main) {
  this.main = main;

  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.y = 0.5;
  physics.acceleration.y = -2;


  var graphics = new graphicsComponent.BirdGraphicsComponent(this);
  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,
    graphics: graphics,
    collision: collision
  };
};

Bird.prototype.onCollision = function(entity) {
  if (entity.type) {
    if (entity.type === 'pipe') {
      this.main.pause();
    } else if (entity.type === 'goal') {
      if (!entity.passed) {
        entity.passed = true;
        this.main.addScore();
      }
    }
  }
};

setTimeout(function() {
  debugger;
}, 15000);

exports.Bird = Bird;

},{"../components/collision/circle":2,"../components/graphics/bird":7,"../components/physics/physics":12,"./goal.js":16,"./pipe.js":17}],14:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/counter");
//var physicsComponent = require("../components/physics/physics");
//var collisionComponent = require("../components/collision/counter");

var goal = require("./goal.js");

var Counter = function() {

  var graphics = new graphicsComponent.CounterGraphicsComponent(this);
  //var physics = new physicsComponent.PhysicsComponent(this);
  //var collision = new collisionComponent.CollisionComponent(this);

  this.components = {
    graphics: graphics
    //physics: physics
   // collision: collision
  };
};


exports.Counter = Counter;

},{"../components/graphics/counter":8,"./goal.js":16}],15:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/endGoal");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/endGoal");
var pipeSystem = require("../systems/pipes.js");
var pipe = require("./pipe.js");

var endGoal = function() {

  console.log('EndGoal Created');

  var size = {
    x: 0.01,
    y: 1
  };

  var position = {
    x: -1.38,
    y: 1
  };

  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.endGoalGraphicsComponent(this, size);
  var collision = new collisionComponent.endGoalCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);


  physics.position = position;

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

endGoal.prototype.onCollision = function(entity) {
  
  this.remove = true;

};






exports.endGoal = endGoal;

},{"../components/collision/endGoal":3,"../components/graphics/endGoal":9,"../components/physics/physics":12,"../systems/pipes.js":23,"./pipe.js":17}],16:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/goal");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/goal");

var Goal = function(position, size) {
    this.type = 'goal';

  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.GoalGraphicsComponent(this, size);
  var collision = new collisionComponent.GoalCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  physics.position = position;
  physics.velocity.x = -0.4;

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Goal.prototype.onCollision = function(entity) {
   
};

exports.Goal = Goal;

},{"../components/collision/goal":4,"../components/graphics/goal":10,"../components/physics/physics":12}],17:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/pipe");
var graphicsComponent = require("../components/graphics/pipe");

var Pipe = function(position, size) {

  this.type = 'pipe';

  var physics = new physicsComponent.PhysicsComponent(this);
  var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);
  var collision = new collisionComponent.PipeCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  physics.position = position;
  physics.velocity.x = -0.4;

  var Pipe = function(position, size) {};

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Pipe.prototype.onCollision = function(entity) {

  if (entity.type && entity.type == 'endGoal') {

    this.remove = true;
  }
};

exports.Pipe = Pipe;

},{"../components/collision/pipe":5,"../components/graphics/pipe":11,"../components/physics/physics":12}],18:[function(require,module,exports){
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

},{"./entities/bird":13,"./entities/counter":14,"./entities/endGoal":15,"./systems/graphics":20,"./systems/input":21,"./systems/physics":22,"./systems/pipes":23}],19:[function(require,module,exports){
var CollisionSystem = function(entities) {
  this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
  for (var i = 0; i < this.entities.length; i++) {
    var entityA = this.entities[i];
    if (!'collision' in entityA.components) {
      continue;
    }

    if (entityA.remove) {
      this.entities.splice(i, 1);
      continue;
    }

    for (var j = i + 1; j < this.entities.length; j++) {
      var entityB = this.entities[j];
      if (!'collision' in entityB.components) {
        continue;
      }

      if (!entityA.components.collision.collidesWith(entityB)) {
        continue;
      }

      entityA.components.collision.onCollision(entityB);
      entityB.components.collision.onCollision(entityA);
    }
  }
};

exports.CollisionSystem = CollisionSystem;

},{}],20:[function(require,module,exports){
var GraphicsSystem = function(main) {
  this.main = main;
  this.entities = main.entities;
  // Canvas is where we draw
  this.canvas = document.getElementById('main-canvas');
  // Context is what we draw to
  this.context = this.canvas.getContext('2d');

};

GraphicsSystem.prototype.run = function() {
  // Run the render loop
  window.requestAnimationFrame(this.tick.bind(this));
  this.main.paused = false;
};

GraphicsSystem.prototype.pause = function() {
  this.main.paused = true;
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

    if (entity.remove) {
      this.entities.splice(i, 1);
      continue;
    }

    entity.components.graphics.draw(this.context);
  }

  this.context.restore();

  if (!this.main.paused) {
    // Continue the render loop
    window.requestAnimationFrame(this.tick.bind(this));
  }
};

exports.GraphicsSystem = GraphicsSystem;

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(main) {
  this.main = main;
  this.entities = main.entities;
  this.interval = null;
  this.time = null;
  this.collisionSystem = new collisionSystem.CollisionSystem(this.entities);
};

PhysicsSystem.prototype.run = function() {
  this.interval = window.setInterval(this.tick.bind(this), 1000 / 60);
  this.time = new Date().getTime();
};


PhysicsSystem.prototype.pause = function() {
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

    if (entity.remove) {
      this.entities.splice(i, 1);
      continue;
    }
    entity.components.physics.update(1 / 60);
  }
  this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;

},{"./collision":19}],23:[function(require,module,exports){
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

},{"../entities/endGoal":15,"../entities/goal":16,"../entities/pipe":17}],24:[function(require,module,exports){
var clamp = function(value, low, high) {
    if (value < low) {
        return low;
    }
    if (value > high) {
        return high;
    }
    return value;
};

exports.clamp = clamp;
},{}]},{},[1]);
