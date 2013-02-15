define(['jaws', 'js/tusk/circle'], function (jaws, Circle) {
    var _setup = function () {
    };

    var _update = function () {
        if (this.dead) {
            return;
        }
        this.radius += this.step;
        if (this.radius >= this.endRadius) {
            this.dead = true;
        }
        this.drawing.circle.radius = this.radius;
    };

    var _draw = function (context) {
        if (this.dead) {
            return;
        }

        this.drawing.circle.draw(context);
    };


    var Explosion = function (options) {
        this.setup = _setup;
        this.update = _update;
        this.draw = _draw;
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.startRadius = options.startRadius || 0;
        this.endRadius = options.endRadius || 0;
        this.step = options.step || 1;
        this.dead = false;

        this.radius = this.startRadius;
        this.drawing = {
            circle: new Circle({
                centerX: this.x,
                centerY: this.y,
                radius: this.radius,
                fillStyle: "red",
                strokeStyle: "black",
                lineWidth: 1
            })
        };


    };

    return Explosion;
});