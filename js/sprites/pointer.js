define(['jaws', 'js/tusk/circle', 'js/tusk/drawing'], function (jaws, Circle, Drawing) {
    var _setup = function () {
    };

    var _update = function () {
        this.drawing.x = jaws.mouse_x;
        this.drawing.y = jaws.mouse_y;
    };

    var _draw = function (context) {
        this.drawing.draw(context);
    };

    var Pointer = function (options) {
        this.drawing = new Drawing();
        this.drawing.add(new Circle({
            radius: 3,
            fillStyle: "black"
        }));

        this.update = _update;
        this.draw = _draw;
    };

    return Pointer;
});