define(["require", "jquery", "jaws", "js/level_swapper", "js/common/sprite_list", "js/common/collision_manager", "js/common/colliders",
    "./../sprites/explosion", "./../sprites/ball", "./../sprites/pointer", "./../sprites/button", "./../sprites/messageDialog",
    "./../tusk/rect", "./../tusk/drawing", "./../tusk/text", "./../common/shapes"],
    function (require, $, jaws, levelSwapper) {
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
        var MessageDialog = require("./../sprites/messageDialog");
        var Drawing = require("./../tusk/drawing");
        var shapes = require("./../common/shapes");


        var fps = $("#fps");
        function generateTargets(field, targets) {
            var i, j, length = targets.length, targetData, target, options, Target, randomNumber,
                result = new SpriteList(), count;
            for (i = 0; i < length; i += 1) {
                targetData = targets[i];
                if (!targetsHash.hasOwnProperty(targetData.type)) {
                    console.log("Cannot load target of type " + targetData.type + " because it was not registered");
                    continue;
                }

                count = targetData.count || 1;
                for (j = 0; j < count; j += 1) {
                    randomNumber = Math.random();

                    options = {
                        x: Math.random() * field.width + field.x,
                        y: Math.random() * field.height + field.y,
                        speedX: Math.sin(Math.PI * 2 * randomNumber) * 5,
                        speedY: Math.cos(Math.PI * 2 * randomNumber) * 5
                    };

                    Target = targetsHash[targetData.type];
                    options = $.extend(options, targetData.options);

                    target = new Target(options);
                    result.add(target);
                }
            }

            return result;
        }

        function getExplosion(x, y) {
            return new Explosion({
                x: x,
                y: y,
                startRadius: 1,
                endRadius: 60,
                steps: 45
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

        Level.prototype.createDrawing = function () {
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

        };

        Level.prototype.createWinDialog = function () {
            var wonDialogButtons = new SpriteList();
            var level = this;
            wonDialogButtons.add(new Button({
                rx: 5,
                ry: 85,
                text: "Retry",
                onClick: function () {
                    setTimeout(levelSwapper.startLevel, 0, Level, level.levelData.name);
                }
            }, jaws.context));

            if (!levelSwapper.isLastLevel(level.levelData.name)) {
                wonDialogButtons.add(new Button({
                    rx: 290,
                    ry: 85,
                    text: "Next level",
                    onClick: function () {
                        setTimeout(levelSwapper.nextLevel, 0, Level, level.levelData.name);
                    }
                }, jaws.context));

            }

            level.gameWonDialog = new MessageDialog({
                x: 100,
                y: 100,
                height: 120,
                text: "Level complete",
                align: "center"
            }, jaws.context, wonDialogButtons, level.field);
        };

        Level.prototype.getGameState = function () {
            if (this.targets.length <= this.levelData.goal) {
                return "win";
            }

            if (this.explosions.length === 0 && this.explosionsLeft === 0) {
                return "lose";
            }

            return "continue";
        };

        Level.prototype.setup = function (levelData) {
            var level = this;
            level._addExplosions = addExplosions;
            level._handleCollisions = handleCollisions;
            level._handleInput = handleInput;
            level._leftMouseButtonPressed = jaws.pressed("left_mouse_button");


            level.field = new shapes.Rect({
                x: 5,
                y: 5,
                width: 640,
                height: 480
            });
            level.gameState = "continue";
            level.levelData = levelData;
            level.explosions = new SpriteList();
            level.targets = generateTargets(level.field, level.levelData.targets);
            level.explosionsLeft = level.levelData.explosions;
            level.pointer = new Pointer();
            level.mouseClicks = [];
            level.collisionManager = new CollisionManager();
            level.collisionManager.register(Ball.prototype.type, Explosion.prototype.type, colliders.circleCircle);
            level.restartButton = new Button({
                x: 5,
                y: 525,
                text: "Restart",
                onClick: function () {
                    setTimeout(levelSwapper.startLevel, 0, Level, level.levelData.name);
                },
                shortcut: "r"
            }, jaws.context);

            level.createWinDialog();

            level.createDrawing();

            jaws.on_keydown("left_mouse_button", function () { });
        };

        Level.prototype.update = function () {
            this.gameState = this.getGameState();
            this.pointer.update(this.field);

            this.drawing.getById("targets label").text = this.targets.length + "/" + this.levelData.goal + " targets";
            this.drawing.getById("explosions label").text = this.explosionsLeft + " explosions";

            if (this.gameState === "win") {
                this.gameWonDialog.update(this.field);
                return;
            }

            if (this.gameState === "lose") {
                return;
            }

            this._handleInput();
            this.targets.update(this.field);
            this.explosions.update(this.field);

            this._addExplosions();
            this._handleCollisions();
            this.restartButton.update(this.field);

        };

        Level.prototype.draw = function () {
            fps.html(jaws.game_loop.fps);
            jaws.clear();
            this.drawing.draw(jaws.context);
            this.targets.draw(jaws.context);
            this.explosions.draw(jaws.context);
            this.restartButton.draw(jaws.context);

            if (this.gameState === "win") {
                this.gameWonDialog.draw(jaws.context);
            }

            this.pointer.draw(jaws.context);

        };

        return Level;
    });