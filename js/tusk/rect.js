define([], function () {
    var Rect = function (options) {
        if (options) {
            this.x = options.x || 0;
            this.y = options.y || 0;
            this.width = options.width || 0;
            this.height = options.height || 0;

            this.fillStyle = options.fillStyle;

            this.lineWidth = options.lineWidth || 1;
            this.strokeStyle = options.strokeStyle;
        }
    };

    Rect.prototype.draw = function (context) {
        if (!context) {
            throw new Error("context must be a canvas context. Use canvas.getContext('2d'); to get a context from a canvas element");
        }

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        if (this.strokeStyle) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeStyle;
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
    };

    return Rect;
});