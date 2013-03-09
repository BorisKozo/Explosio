define(['jaws', 'lodash', './../common/sprite_base', './../common/shapes', 'js/tusk/drawing', 'js/tusk/round_rect', 'js/tusk/text'], function (jaws, _, spriteBase, shapes, Drawing, RoundRect, Text) {

    var MessageDialog = function (options, context, buttons, field) {

        options = options || {};
        this.x = options.x || this.x;
        this.y = options.y || this.y;
        this.align = options.align;
        this.height = 100;
        this.buttons = buttons;

        this.setText(options.text || "", context, field);
    };

    _.extend(MessageDialog.prototype, spriteBase);

    MessageDialog.prototype.type = "messageDialog";

    MessageDialog.prototype.innerDraw = function (context) {
        this.drawing.draw(context);
        this.buttons.draw(context);
    };

    MessageDialog.prototype.innerUpdate = function (field) {
        this.buttons.update(field);
    };

    MessageDialog.prototype.setText = function (text, context, field) {

        var textElement, textWidth;
        textElement = new Text({
            x: 6,
            y: 2,
            fillStyle: "BlueViolet",
            text: text,
            font: "60px Arial"
        });

        this.text = text;
        textWidth = textElement.measureText(context);
        this.width = textWidth + 12;
        this.drawing = new Drawing({
            x: this.x,
            y: this.y
        });

        this.drawing.add(new RoundRect({
            x: 0,
            y: 0,
            height: this.height,
            width: this.width,
            radius: 4,
            strokeStyle: "Cornsilk",
            fillStyle: "rgba(255,248,220,0.9)"
        }), "border");

        this.drawing.add(textElement, "text");

        if (this.align && field) {
            if (this.align === "center") {
                this.x = field.x + field.width / 2 - this.width / 2;
                this.drawing.x = this.x;
            }
        }

    };

    return MessageDialog;
});