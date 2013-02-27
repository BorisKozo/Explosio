define([], function () {
    var RoundRect = function (options) {
        if (options) {
            this.x = options.x || 0;
            this.y = options.y || 0;
            this.width = options.width || 0;
            this.height = options.height || 0;
            this.radius = options.radius || 0;

            this.fillStyle = options.fillStyle;

            this.lineWidth = options.lineWidth || 1;
            this.strokeStyle = options.strokeStyle;
        }
    };

    RoundRect.prototype.draw = function (context, options) {
        var x, y, radius, width, height;
        if (!context) {
            throw new Error("context must be a canvas context. Use canvas.getContext('2d'); to get a context from a canvas element");
        }

        x = this.x + (options.dx || 0)
        y = this.y + (options.dy || 0);
        radius = this.radius;
        width = this.width;
        height = this.height;

        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
            context.fill();
        }

        if (this.strokeStyle) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeStyle;
            context.stroke();
        }

    };

    return RoundRect;
});
