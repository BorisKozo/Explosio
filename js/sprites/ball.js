define(['jaws', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, Circle, Drawing) {

    var _move = function (field) {
        var circle;

        this.x += this.speedX;
        this.y += this.speedY;
        if ((this.x - this.radius) < 0) {
            this.x = this.radius;
            this.speedX = -this.speedX;
        }

        if ((this.x + this.radius) > field.width) {
            this.x = field.width - this.radius;
            this.speedX = -this.speedX;
        }

        if ((this.y - this.radius) < 0) {
            this.y = this.radius;
            this.speedY = -this.speedY;
        }

        if ((this.y + this.radius) > field.height) {
            this.y = field.height - this.radius;
            this.speedY = -this.speedY;
        }

        this.drawing.x = this.x;
        this.drawing.y = this.y;
    }

    var _update = function (field) {

        if (this.dead) {
            return;
        }

        _move.call(this, field);
    };

    var _draw = function (context) {
        if (this.dead) {
            return;
        }

        this.drawing.draw(context);
    };

    ///
    /// x : Ball center X coordinate
    /// y : Ball center Y coordinate

    var Ball = function (options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.speedX = options.speedX || 0;
        this.speedY = options.speedY || 0;
        this.radius = 15;
        this.dead = false;
        this.drawing = new Drawing({
            x: this.x,
            y: this.y
        });
        this.drawing.add(new Circle({
            centerX: 0,
            centerY: 0,
            radius: this.radius,
            fillStyle: "rgba(240,248,255,0.9)"
        }), "circle");
    };

    Ball.prototype.type = "ball";
    Ball.prototype.draw = _draw;
    Ball.prototype.update = _update;

    return Ball;
});