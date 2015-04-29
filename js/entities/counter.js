var graphicsComponent = require("../components/graphics/counter");
var collisionComponent = require("../components/collision/goal");

var Counter = function() {

    var graphics = new graphicsComponent.CounterGraphicsComponent(this);
   

    this.components = {
        graphics: graphics
    };
};


exports.Counter = Counter;