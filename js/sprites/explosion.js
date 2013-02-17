define(['jaws', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, Circle, Drawing) {

    var _update = function () {
        var circle;
        if (this.dead) {
            return;
        }
        this.radius += this.step;
        if (this.radius >= this.endRadius) {
            this.dead = true;
        }
        circle = this.drawing.getById("circle");
        circle.radius = this.radius;
        this.alpha -= this.alphaStep;
        circle.fillStyle = "rgba(255,0,0," + this.alpha + ")";
    };

    var _draw = function (context) {
        if (this.dead) {
            return;
        }

        this.drawing.draw(context);
    };

    ///
    /// x : Explosion center X coordinate
    /// y : Explosion center Y coordinate
    /// startRadius : The initial explosion radius
    /// endRadius : The final (biggest) explosion radius
    /// step : The increase in radius size on each call to update (should be millisecond)

    var Explosion = function (options) {
        var totalSteps;
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.startRadius = options.startRadius || 0;
        this.endRadius = options.endRadius || 0;
        this.step = options.step || 1;
        this.dead = false;
        totalSteps = (this.endRadius - this.startRadius) / this.step;

        this.alpha = 0.5;
        this.alphaStep = this.alpha / totalSteps;

        this.radius = this.startRadius;
        this.drawing = new Drawing();
        this.drawing.add(new Circle({
            centerX: this.x,
            centerY: this.y,
            radius: this.radius,
            fillStyle: "rgba(255,0,0," + this.alpha + ")"
        }), "circle");
    };

    Explosion.prototype.type = "explosions";
    Explosion.prototype.draw = _draw;
    Explosion.prototype.update = _update;

    return Explosion;
});