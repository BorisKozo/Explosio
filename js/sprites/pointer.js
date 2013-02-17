define(['jaws', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, Circle, Drawing) {

    var _update = function () {
        this.drawing.x = jaws.mouse_x;
        this.drawing.y = jaws.mouse_y;
    };

    var _draw = function (context) {
        this.drawing.draw(context);
    };

    var Pointer = function () {
        this.drawing = new Drawing();
        this.drawing.add(new Circle({
            radius: 2,
            fillStyle: "white"
        }));
    };

    Pointer.prototype.draw = _draw;
    Pointer.prototype.update = _update;
    Pointer.prototype.type = "pointer";

    return Pointer;
});