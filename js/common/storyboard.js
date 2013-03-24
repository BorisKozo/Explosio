define(['lodash', './sprite_list'], function (_, SpriteList) {

    function comparator(item) {
        return item.time;
    }

    var Storyboard = function () {
        this.sprites = new SpriteList();
        this.waiting = [];
        this.updateCount = 0;
        this.dead = false;
    };

    Storyboard.prototype.update = function (field) {
        var tempItem;
        this.sprites.update(field);
        this.updateCount += 1;
        while (this.waiting.length > 0 && this.waiting[0].time <= this.updateCount) {
            tempItem = this.waiting.shift();
            this.sprites.add(tempItem.item);
        }
        if (this.sprites.length === 0 && this.waiting.length === 0) {
            this.dead = true;
        }
    };

    Storyboard.prototype.draw = function (context) {
        this.sprites.draw(context);
    };

    Storyboard.prototype.add = function (item, time) {
        this.waiting.push({ item: item, time: time + this.updateCount });
        this.waiting = _.sortBy(this.waiting, comparator);
    };

    return Storyboard;


});