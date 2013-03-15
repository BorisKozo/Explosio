define(['jaws', 'lodash', './../common/sprite_base', './../common/shapes', 'js/tusk/drawing', 'js/tusk/round_rect', 'js/tusk/text'], function (jaws, _, spriteBase, shapes, Drawing, RoundRect, Text) {

    var Button = function (options, context) {
        var text, textWidth;

        options = options || {};
        
        this.x = options.x || this.x;
        this.y = options.y || this.y;
        this.rx = options.rx || 0;
        this.ry = options.ry || 0;

        this.text = options.text || "";
        this.onClick = options.onClick;
        
        if (options.shortcut) {
            jaws.on_keydown(options.shortcut, this.onClick);
        }

        this.drawing = new Drawing({
            x: this.x,
            y: this.y
        });

        text = new Text({
            x: 6,
            y: 2,
            text: this.text,
            font: "24px Arial"
        });

        textWidth = text.measureText(context);
        this.height = 30;
        this.width = textWidth + 12;

        this.drawing.add(text, "text");

        this.drawing.add(new RoundRect({
            x: 0,
            y: 0,
            height: this.height,
            width: this.width,
            radius: 4
        }), "border");

        this.bbox = new shapes.Rect({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        });


        this.pressed = jaws.pressed("left_mouse_button");

    };

    _.extend(Button.prototype, spriteBase);

    Button.prototype.type = "button";

    Button.prototype.innerDraw = function (context) {
        this.drawing.draw(context);
    };

    Button.prototype.innerUpdate = function (field) {
        var text = this.drawing.getById("text"),
            border = this.drawing.getById("border"),
            pressed;

        if (this.bbox.contains(jaws.mouse_x, jaws.mouse_y)) {
            text.fillStyle = "BlueViolet";
            border.strokeStyle = "BlueViolet";
        } else {
            text.fillStyle = "Cornsilk";
            border.strokeStyle = "Cornsilk";
        }

        pressed = jaws.pressed("left_mouse_button");
        if (!this.pressed && pressed && this.bbox.contains(jaws.mouse_x, jaws.mouse_y) && this.onClick) {
            this.pressed = pressed;
            this.onClick();
        }
        this.pressed = pressed;

    };

    Button.prototype.innerMoveTo = function () {
        this.drawing.x = this.x;
        this.drawing.y = this.y;
    }

    return Button;
});