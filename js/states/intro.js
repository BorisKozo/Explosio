define(["require", "jquery", "jaws", "js/level_swapper", "./../common/storyboard", "./../common/sprite_list",
        "./../common/shapes", "./../sprites/pointer", "./../sprites/ball", "./../sprites/explosion",
        "./../tusk/drawing", "./../tusk/text", "./../tusk/rect"], function (require, $, jaws) {
            var SpriteList = require("./../common/sprite_list");
            var Pointer = require("./../sprites/pointer");
            var shapes = require("./../common/shapes");
            var Storyboard = require("./../common/storyboard");
            var Explosion = require("./../sprites/explosion");

            var Drawing = require("./../tusk/drawing")
            var Text = require("./../tusk/text");
            var Rect = require("./../tusk/rect");

            var Ball = require("./../sprites/ball");

            var fps = $("#fps");

            var Intro = function () {

            };


            Intro.prototype.setup = function () {
                var explosionsAnimation = new Storyboard();
                this._leftMouseButtonPressed = jaws.pressed("left_mouse_button");
                this.pointer = new Pointer();
                this.field = new shapes.Rect({
                    x: 5,
                    y: 5,
                    width: 640,
                    height: 480
                });

                this.drawing = new Drawing();

                this.drawing.add(new Rect({
                    x: 5,
                    y: 5,
                    width: 640,
                    height: 550,
                    strokeStyle: "Cornsilk"
                }), "border");


                this.drawing.add(new Text({
                    x: 135,
                    y: 30,
                    text: "Explosio",
                    fillStyle: "Cornsilk",
                    font: "100px Arial"
                }), "title");

                this.drawing.add(new Text({
                    x: 155,
                    y: 450,
                    text: "Click or touch anywhere to start",
                    fillStyle: "BlueViolet",
                    font: "24px Arial"
                }));

                this.animation = new SpriteList();
                this.animation.add(explosionsAnimation);

                explosionsAnimation.add(new Explosion({
                    x: 120,
                    y: 200,
                    startRadius: 1,
                    endRadius: 60,
                    steps: 45
                }), 30);

                explosionsAnimation.add(new Explosion({
                    x: 250,
                    y: 360,
                    startRadius: 1,
                    endRadius: 60,
                    steps: 45
                }), 50);

                explosionsAnimation.add(new Explosion({
                    x: 370,
                    y: 200,
                    startRadius: 1,
                    endRadius: 60,
                    steps: 45
                }), 70);

                explosionsAnimation.add(new Explosion({
                    x: 480,
                    y: 300,
                    startRadius: 1,
                    endRadius: 60,
                    steps: 45
                }), 90);


            };

            Intro.prototype.draw = function () {
                fps.html(jaws.game_loop.fps);
                jaws.clear();

                this.drawing.draw(jaws.context);
                this.animation.draw(jaws.context);

                this.pointer.draw(jaws.context);

            };

            Intro.prototype.update = function () {
                this.pointer.update(this.field);
                this.animation.update(this.field);
                this.handleInput();
            };

            Intro.prototype.handleInput = function() {
                var pressed = jaws.pressed("left_mouse_button");

                if (!this._leftMouseButtonPressed && pressed && this.field.contains(jaws.mouse_x, jaws.mouse_y)) {
                    setTimeout(Intro.stateManager.changeState, 0, "LevelSelect");
                }
                this._leftMouseButtonPressed = pressed;
            }


            Intro.stateName = "Intro";

            return Intro;

        });