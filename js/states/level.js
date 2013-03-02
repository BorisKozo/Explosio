define(["require", "jquery", "jaws", "js/common/sprite_list", "js/common/collision_manager", "js/common/colliders",
    "./../sprites/explosion", "./../sprites/ball", "./../sprites/pointer", "./../sprites/button", "./../tusk/rect", "./../tusk/drawing", "./../tusk/text",
    "./../common/shapes"],
    function (require, $, jaws) {
        var targetsHash = {};
        var Ball = require("./../sprites/ball");
        targetsHash[Ball.prototype.type] = Ball; //Should do it in some smarter way

        var Explosion = require("./../sprites/explosion");
        var Pointer = require("./../sprites/pointer");
        var Button = require("./../sprites/button");
        var SpriteList = require("js/common/sprite_list");
        var CollisionManager = require("js/common/collision_manager");
        var colliders = require("js/common/colliders");
        var Rect = require("./../tusk/rect");
        var Text = require("./../tusk/text");
        var Drawing = require("./../tusk/drawing");
        var shapes = require("./../common/shapes");


        var fps = $("#fps");
        function generateTargets(field, targets) {
            var i, length = targets.length, targetData, target, options, Target,
                result = new SpriteList();
            for (i = 0; i < length; i += 1) {
                targetData = targets[i];
                if (!targetsHash.hasOwnProperty(targetData.type)) {
                    console.log("Cannot load target of type " + targetData.type + " because it was not registered");
                    continue;
                }

                options = {
                    x: Math.random() * field.width + field.x,
                    y: Math.random() * field.height + field.y,
                    speedX: 2 * (Math.random() - 0.5) * 3,
                    speedY: 2 * (Math.random() - 0.5) * 3
                };

                Target = targetsHash[targetData.type];
                options = $.extend(options, targetData.options);

                target = new Target(options);
                result.add(target);
            }

            return result;
        }

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

        function handleInput() {
            var pressed = jaws.pressed("left_mouse_button");

            if (!this._leftMouseButtonPressed && pressed && this.field.contains(jaws.mouse_x, jaws.mouse_y)) {
                if (this.explosionsLeft > 0) {
                    this.explosionsLeft -= 1;
                    this.mouseClicks.push({
                        x: jaws.mouse_x,
                        y: jaws.mouse_y
                    });


                }
            }
            this._leftMouseButtonPressed = pressed;

        }


        var Level = function () {
        };

        Level.prototype.setup = function (levelData) {
            var _this = this;
            this._addExplosions = addExplosions;
            this._handleCollisions = handleCollisions;
            this._handleInput = handleInput;
            this._leftMouseButtonPressed = false;

            this.field = new shapes.Rect({
                x: 5,
                y: 5,
                width: 640,
                height: 480
            });

            this.explosions = new SpriteList();
            this.targets = generateTargets(this.field, levelData.targets);
            this.goal = levelData.goal;
            this.explosionsLeft = levelData.explosions;
            this.pointer = new Pointer();
            this.mouseClicks = [];
            this.collisionManager = new CollisionManager();
            this.collisionManager.register(Ball.prototype.type, Explosion.prototype.type, colliders.circleCircle);
            this.restartButton = new Button({
                x: 5,
                y: 525,
                text: "Restart",
                onClick: function () {
                    setTimeout(jaws.switchGameState, 0, Level, {}, levelData);
                },
                shortcut: "r"
            }, jaws.context);

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
                text: "",
                font: "24px Arial",
                fillStyle: "Cornsilk"
            }), "targets label");

            this.drawing.add(new Text({
                x: this.field.right(),
                y: 490,
                text: "Test",
                textAlign: "right",
                font: "24px Arial",
                fillStyle: "Cornsilk"
            }), "explosions label");

            jaws.on_keydown("left_mouse_button", function () { });
        };

        Level.prototype.update = function () {
            this._handleInput();
            this.targets.update(this.field);
            this.explosions.update(this.field);
            this.pointer.update(this.field);
            this._addExplosions();
            this._handleCollisions();
            this.restartButton.update(this.field);

            this.drawing.getById("targets label").text = this.targets.length + "/" + this.goal + " targets";
            this.drawing.getById("explosions label").text = this.explosionsLeft + " explosions";

        };

        Level.prototype.draw = function () {
            fps.html(jaws.game_loop.fps);
            jaws.clear();
            this.drawing.draw(jaws.context);
            this.targets.draw(jaws.context);
            this.explosions.draw(jaws.context);
            this.pointer.draw(jaws.context);
            this.restartButton.draw(jaws.context);

        };

        return Level;
    });