define([], function () {

    var Drawing = function (options) {
        this.data = [];
        this.length = 0;
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
    };

    Drawing.prototype.draw = function (context) {
        for (var i = 0; i < this.length; i += 1) {
            this.data[i].draw(context, {
                dx: this.x,
                dy: this.y
            });
        }
    };

    Drawing.prototype.add = function (item) {
        this.data.push(item);
        this.length += 1;
    };

    return Drawing;

});