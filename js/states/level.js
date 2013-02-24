define(["require", "jquery", "jaws", "js/common/sprite_list", "js/common/collision_manager", "js/common/colliders",
    "./../sprites/explosion", "./../sprites/ball", "./../sprites/pointer", "./../tusk/rect", "./../tusk/drawing", "./../tusk/text",
    "./../common/shapes"],
    function (require, $, jaws) {
        var Ball = require("./../sprites/ball");
        var Explosion = require("./../sprites/explosion");
        var Pointer = require("./../sprites/pointer");
        var SpriteList = require("js/common/sprite_list");
        var CollisionManager = require("js/common/collision_manager");
        var colliders = require("js/common/colliders");
        var Rect = require("./../tusk/rect");
        var Text = require("./../tusk/text");
        var Drawing = require("./../tusk/drawing");
        var shapes = require("./../common/shapes");


        var fps = $("#fps");
        function getExplosion(x, y) {
            return new Explosion({
                x: x,
                y: y,
                startRadius: 1,
                endRadius: 40,
                step: 0.5
            });
        }

        /// Adds the explosions to the game based on the mouse clicks (currently hard coded values)
        function addExplosions() {
            var i, mouseClicksLength;
            mouseClicksLength = this.mouseClicks.length;
            if (mouseClicksLength > 0) {
                for (i = 0; i < mouseClicksLength; i += 1) {
                    this.explosions.add(getExplosion(this.mouseClicks[i].x, this.mouseClicks[i].y));
                }
                this.mouseClicks = [];
            }

        }

        function handleCollisions() {

            var i, j, lengthExplosions = this.explosions.length, lengthTargets = this.targets.length,
                explosion, target;

            for (i = 0; i < lengthExplosions; i += 1) {
                for (j = 0; j < lengthTargets; j += 1) {
                    explosion = this.explosions.at(i);
                    target = this.targets.at(j);
                    if (this.collisionManager.areColliding(explosion, target)) {

                        target.dead = true;
                        this.explosions.add(getExplosion(target.x, target.y));
                    }
                }
            }
        }


        var Level = function () {
            this._addExplosions = addExplosions;
            this._handleCollisions = handleCollisions;

            this.setup = function () {
                var _this = this;
                this.explosions = new SpriteList();
                this.targets = new SpriteList();
                this.pointer = new Pointer();
                this.mouseClicks = [];
                this.collisionManager = new CollisionManager();
                this.collisionManager.register(Ball.prototype.type, Explosion.prototype.type, colliders.circleCircle);
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
                    height: 480,
                    strokeStyle: "Cornsilk"
                }));

                this.drawing.add(new Text({
                    x: 5,
                    y: 490,
                    text: "Hello World",
                    font: "24px Arial",
                    fillStyle: "Cornsilk" 
                }), "targets label");

                this.targets.add(new Ball({
                    x: 100,
                    y: 100,
                    speedX: 0.5,
                    speedY: 0.7
                }));

                jaws.on_keydown("left_mouse_button", function () {
                    if (_this.field.contains(jaws.mouse_x, jaws.mouse_y)) {
                        _this.mouseClicks.push({
                            x: jaws.mouse_x,
                            y: jaws.mouse_y
                        });
                    }
                });
            };

            this.update = function () {
                this.targets.update(this.field);
                this.explosions.update(this.field);
                this.pointer.update(this.field);
                this._addExplosions();
                this._handleCollisions();
            };

            this.draw = function () {
                fps.html(jaws.game_loop.fps);
                jaws.clear();
                this.drawing.draw(jaws.context);
                this.targets.draw(jaws.context);
                this.explosions.draw(jaws.context);
                this.pointer.draw(jaws.context);

            };
        };

        return Level;
    });