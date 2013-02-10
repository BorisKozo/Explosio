define([], function () {
    var twoPi = Math.PI * 2;
    var Circle = function (options) {
        if (options) {
            this.centerX = options.centerX || 0;
            this.centerY = options.centerY || 0;
            this.radius = options.radius || 0;

            this.fillStyle = options.fillStyle;

            this.lineWidth = options.lineWidth || 1;
            this.strokeStyle = options.strokeStyle;
        }
    };

    Circle.prototype.draw = function (context) {
        if (!context) {
            throw new Error("context must be a canvas context. Use canvas.getContext('2d'); to get a context from a canvas element");
        }

        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, 0, twoPi, false);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
            context.fill();
        }

        if (this.strokeStyle) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeStyle;
            context.stroke();
        }

        context.closePath();
    };

    return Circle;
});