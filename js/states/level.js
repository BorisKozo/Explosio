define(["require", "jquery", "jaws", "js/common/sprite_list", "js/common/collision_manager", "js/common/colliders", "./../sprites/explosion", "./../sprites/ball", "./../sprites/pointer"],
    function (require, $, jaws) {
        var Ball = require("./../sprites/ball");
        var Explosion = require("./../sprites/explosion");
        var Pointer = require("./../sprites/pointer");
        var SpriteList = require("js/common/sprite_list");
        var CollisionManager = require("js/common/collision_manager");
        var colliders = require("js/common/colliders");


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
                this.field = {
                    width: 640,
                    height: 480
                };

                this.targets.add(new Ball({
                    x: 100,
                    y: 100,
                    speedX: 0.5,
                    speedY: 0.7
                }));

                jaws.on_keydown("left_mouse_button", function () {
                    _this.mouseClicks.push({
                        x: jaws.mouse_x,
                        y: jaws.mouse_y
                    });
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

                this.targets.draw(jaws.context);
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