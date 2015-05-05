var graphicsComponent = require("../components/graphics/counter");
var physicsComponent = require("../components/physics/physics");


var Counter = function() {

    var graphics = new graphicsComponent.CounterGraphicsComponent(this);
   
    this.components = {
        graphics: graphics
    };
};


exports.Counter = Counter;