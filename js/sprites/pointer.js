define(['jaws', 'lodash', './../common/sprite_base', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, _, spriteBase, Circle, Drawing) {

    var Pointer = function () {
        this.drawing = new Drawing();
        this.drawing.add(new Circle({
            radius: 2,
            fillStyle: "white"
        }));
    };
    _.extend(Pointer.prototype, spriteBase);
    Pointer.prototype.innerDraw = function (context) {
        this.drawing.draw(context);
    };

    Pointer.prototype.innerUpdate = function () {
        this.drawing.x = jaws.mouse_x;
        this.drawing.y = jaws.mouse_y;
    };

    Pointer.prototype.type = "pointer";

    return Pointer;
});