define(['jaws', 'lodash', './../common/sprite_base', './../common/shapes', 'js/tusk/drawing', 'js/tusk/round_rect', 'js/tusk/text'], function (jaws, _, spriteBase, shapes, Drawing, RoundRect, Text) {

    var MessageDialog = function (options, context, buttons) {

        options = options || {};
        this.x = options.x || this.x;
        this.y = options.y || this.y;
        this.height = 100;
        this.buttons = buttons;

        this.setText(options.text || "", context);
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

    MessageDialog.prototype.setText = function (text, context) {

        var textElement, textWidth;
        textElement = new Text({
            x: 6,
            y: 2,
            fillStyle: "Cornsilk",
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
        this.drawing.add(textElement, "text");
        this.drawing.add(new RoundRect({
            x: 0,
            y: 0,
            height: this.height,
            width: this.width,
            radius: 4,
            strokeStyle: "Cornsilk"
        }), "border");

    };

    return MessageDialog;
});