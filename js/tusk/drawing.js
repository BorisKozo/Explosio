define([], function () {

    var Drawing = function (options) {
        this.data = {};
        this.tempId = 0;
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
    };

    Drawing.prototype.draw = function (context) {
        var itemId;
        context.save();
        context.translate(this.x, this.y);
        for (itemId in this.data) {
            if (this.data.hasOwnProperty(itemId)) {
                this.data[itemId].draw(context);
            }
        }
        context.restore();
    };

    Drawing.prototype.add = function (item, id) {
        if (!id) {
            id = "$" + this.tempId + "$";
            this.tempId += 1;
        }
        this.data[id] = item;
    };

    Drawing.prototype.getById = function (id) {
        if (id) {
            return this.data[id];
        } else {
            return undefined;
        }
    };

    return Drawing;

});