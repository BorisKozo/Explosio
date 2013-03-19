define(["./shapes"], function (shapes) {
    return {
        beforeCollision: function () { },
        collision: function () { },
        afterCollision: function () { },

        dead: false,
        type: "sprite_base",

        x: 0,
        y: 0,
        width: 0,
        height: 0,

        draw: function (context) {
            if (this.dead) {
                return;
            }

            if (this.innerDraw) {
                this.innerDraw(context);
            }
        },

        update: function (field) {
            if (this.dead) {
                return;
            }

            if (this.innerUpdate) {
                this.innerUpdate(field);
            }
        },

        initialize: function () {
            this.bbox = new shapes.Rect({
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            });
        },

        moveTo: function (x, y) {
            this.x = x;
            this.y = y;
            if (this.innerMoveTo) {
                this.innerMoveTo();
            }

            this.bbox = new shapes.Rect({
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            });
        }

    };
});