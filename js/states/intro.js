define(["require", "jquery", "jaws", "js/level_swapper", "./../common/storyboard", "./../common/sprite_list",
        "./../common/shapes", "./../common/math", "./../sprites/pointer", "./../sprites/ball", "./../sprites/explosion",
        "./../tusk/drawing", "./../tusk/text", "./../tusk/rect"], function (require, $, jaws) {
            var SpriteList = require("./../common/sprite_list");
            var Pointer = require("./../sprites/pointer");
            var shapes = require("./../common/shapes");
            var Storyboard = require("./../common/storyboard");
            var Explosion = require("./../sprites/explosion");
            var math = require("./../common/math");

            var Drawing = require("./../tusk/drawing")
            var Text = require("./../tusk/text");
            var Rect = require("./../tusk/rect");

            var Ball = require("./../sprites/ball");

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

                
                for (var i = 0; i < 30; i++) {
                    explosionsAnimation.add(new Explosion({
                        x: math.randomInRange(this.field.left(),this.field.right()),
                        y: math.randomInRange(this.field.top(), this.field.bottom()),
                        startRadius: 1,
                        endRadius: 60,
                        steps: 45
                    }), math.randomInRange(i*10,(i+1)*10));
                }
            };

            Intro.prototype.draw = function () {
                jaws.clear();

                this.animation.draw(jaws.context);
                this.drawing.draw(jaws.context);
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