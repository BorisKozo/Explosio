﻿define(["jquery", "jaws", "./../sprites/pointer", "js/common/sprite_list", './../sprites/explosion'], function ($, jaws, Pointer, SpriteList, Explosion) {


    var fps = $("#fps"),
        addExplosions = function () {
            var i, mouseClicksLength, data;
            mouseClicksLength = this.mouseClicks.length;
            if (mouseClicksLength > 0) {
                for (i = 0; i < mouseClicksLength; i += 1) {
                    data = {
                        x: this.mouseClicks[i].x,
                        y: this.mouseClicks[i].y,
                        startRadius: 1,
                        endRadius: 40,
                        step: 0.5
                    };
                    this.explosions.add(new Explosion(data));
                }
                this.mouseClicks = [];
            }

        };

    var Level = function () {
        this._addExplosions = addExplosions;

        this.setup = function () {
            var _this = this;
            this.explosions = new SpriteList();
            this.pointer = new Pointer();
            this.mouseClicks = [];

            jaws.on_keydown("left_mouse_button", function () {
                _this.mouseClicks.push({
                    x: jaws.mouse_x,
                    y: jaws.mouse_y
                });
            });
        };

        this.update = function () {

            this.explosions.update();
            this.pointer.update();
            this._addExplosions();
        };

        this.draw = function () {
            fps.html(jaws.game_loop.fps);
            jaws.context.clearRect(0, 0, jaws.width, jaws.height);

            this.explosions.draw(jaws.context);
            this.pointer.draw(jaws.context);

            // console.log(jaws.pressed("left_mouse_button"));
            //circle.centerX = jaws.mouse_x;
            //circle.centerY = jaws.mouse_y;
            //circle.draw(jaws.context);
            
            //jaws.context.fillStyle = "red";
            //jaws.context.fillRect(0, 0, 300, 150);
            //jaws.context.clearRect(20, 20, 100, 50);
            //jaws.context.clearRect(0, 0, jaws.width, jaws.height)
            //jaws.context.font = "bold 50pt terminal";
            //jaws.context.lineWidth = 10;
            //jaws.context.fillStyle = "Black";
            //jaws.context.strokeStyle = "rgba(200,200,200,0.0)";
            //jaws.context.fillText("Hello World",50,200);
        };
    };

    return Level;
});