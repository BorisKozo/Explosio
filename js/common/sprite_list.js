define(['./array_helper'], function (array_helper) {
    var SpriteList = function () {
        this.length = 0;
        this.data = [];
    };

    SpriteList.prototype.update = function () {
        for (var i = 0; i < this.length; i += 1) {
            this.data[i].update();
            if (this.data[i].dead) {
                array_helper.remove(this.data, i);
                i -= 1;
                this.length -= 1;
            }
        }
    };

    SpriteList.prototype.draw = function (context) {
        for (var i = 0; i < this.length; i += 1) {
            this.data[i].draw(context);
        }
    };

    SpriteList.prototype.add = function (item) {
        this.data.push(item);
        this.length += 1;
    };

    return SpriteList;


})