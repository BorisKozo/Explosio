define(['jaws', 'lodash', './../common/sprite_base', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, _, spriteBase, Circle, Drawing) {

    ///
    /// x : Explosion center X coordinate
    /// y : Explosion center Y coordinate
    /// startRadius : The initial explosion radius
    /// endRadius : The final (biggest) explosion radius
    /// step : The increase in radius size on each call to update (should be millisecond)

    var Explosion = function (options) {
        var totalSteps;
        options = options || {};
        this.x = options.x || this.x;
        this.y = options.y || this.x;
        this.startRadius = options.startRadius || 0;
        this.endRadius = options.endRadius || 0;
        this.step = options.step || 1;

        totalSteps = (this.endRadius - this.startRadius) / this.step;

        this.alpha = 0.5;
        this.alphaStep = 0.3 / totalSteps;

        this.radius = this.startRadius;
        this.drawing = new Drawing();
        this.drawing.add(new Circle({
            centerX: this.x,
            centerY: this.y,
            radius: this.radius,
            fillStyle: "rgba(255,0,0," + this.alpha + ")"
        }), "circle");
    };

    _.extend(Explosion.prototype, spriteBase);

    Explosion.prototype.type = "explosion";

    Explosion.prototype.innerDraw = function (context) {
        this.drawing.draw(context);
    };

    Explosion.prototype.innerUpdate = function () {
        var circle;
        this.radius += this.step;
        if (this.radius >= this.endRadius) {
            this.dead = true;
        }
        circle = this.drawing.getById("circle");
        circle.radius = this.radius;
        this.alpha -= this.alphaStep;
        circle.fillStyle = "rgba(255,0,0," + this.alpha + ")";
    };

    return Explosion;
});