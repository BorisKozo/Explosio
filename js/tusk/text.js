define([], function () {
    var Text = function (options) {
        if (options) {
            this.x = options.x || 0;
            this.y = options.y || 0;
            this.font = options.font || "15px Arial";

            this.fillStyle = options.fillStyle;
            this.textAlign = options.textAlign || "start";
            this.textBaseline = options.textBaseline || "top";

            this.lineWidth = options.lineWidth || 1;
            this.strokeStyle = options.strokeStyle;

            this.text = options.text || "";
        }
    };

    Text.prototype.draw = function (context) {

        if (!context) {
            throw new Error("context must be a canvas context. Use canvas.getContext('2d'); to get a context from a canvas element");
        }

        context.font = this.font;
        context.textAlign = this.textAlign;
        context.textBaseline = this.textBaseline;

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
            context.fillText(this.text, this.x, this.y);
        }

        if (this.strokeStyle) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeStyle;
            context.strokeText(this.text, this.x, this.y);
        }
    };

    Text.prototype.measureText = function (context) {
        if (!context) {
            throw new Error("context must be a canvas context. Use canvas.getContext('2d'); to get a context from a canvas element");
        }

        context.font = this.font;
        context.textAlign = this.textAlign;
        context.textBaseline = this.textBaseline;
        return context.measureText(this.text).width;
    };


    return Text;
});