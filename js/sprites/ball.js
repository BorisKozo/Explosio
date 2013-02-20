define(['jaws', 'lodash', './../common/sprite_base', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, _, spriteBase, Circle, Drawing) {

    var _move = function (field) {

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
    };

    ///
    /// x : Ball center X coordinate
    /// y : Ball center Y coordinate

    var Ball = function (options) {
        
        options = options || {};
        this.x = options.x || this.x;
        this.y = options.y || this.y;
        this.speedX = options.speedX || 0;
        this.speedY = options.speedY || 0;
        this.radius = 15;

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

    _.extend(Ball.prototype, spriteBase);

    Ball.prototype.type = "ball";
  
    Ball.prototype.innerDraw = function (context) {
        this.drawing.draw(context);
    };

    Ball.prototype.innerUpdate =  function (field) {
        _move.call(this, field);
    };

    return Ball;
});