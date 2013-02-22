define(['./array_helper'], function (array_helper) {
    var SpriteList = function () {
        this.length = 0;
        this.data = [];
    };

    SpriteList.prototype.update = function (field) {
        for (var i = 0; i < this.length; i += 1) {
            this.data[i].update(field);
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

    SpriteList.prototype.at = function (index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }

        return this.data[index];
    };


    return SpriteList;


});