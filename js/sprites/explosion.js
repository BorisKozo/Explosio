define(['jaws', 'lodash', './../common/sprite_base', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, _, spriteBase, Circle, Drawing) {

    ///
    /// x : Explosion center X coordinate
    /// y : Explosion center Y coordinate
    /// startRadius : The initial explosion radius
    /// endRadius : The final (biggest) explosion radius
    /// steps : the number of updates to reach from start to end radius

    var Explosion = function (options) {
        options = options || {};
        this.x = options.x || this.x;
        this.y = options.y || this.x;
        this.startRadius = options.startRadius || 0;
        this.endRadius = options.endRadius || 0;
        this.steps = options.steps || 3;

        this.step = (this.endRadius - this.startRadius) / this.steps;

        this.alpha = 0.5;
        this.alphaStep = 0.3 / this.steps;

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