define([], function () {
    return {
        beforeCollision: function () { },
        collision: function () { },
        afterCollision: function () { },

        dead: false,
        type: "sprite_base",

        x: 0,
        y: 0,

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
        }

    };
});