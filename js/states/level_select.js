define(["require", "jquery", "jaws", "js/level_swapper", "./../sprites/button", "./../common/sprite_list", "./../common/shapes", "./../sprites/pointer", "./../tusk/drawing", "./../tusk/text","./../tusk/rect", "./level"], function (require, $, jaws) {
    var levelSwapper = require("js/level_swapper");
    var Button = require("./../sprites/button");
    var SpriteList = require("./../common/sprite_list");
    var Pointer = require("./../sprites/pointer");
    var shapes = require("./../common/shapes");

    var Drawing = require("./../tusk/drawing")
    var Text = require("./../tusk/text");
    var Rect = require("./../tusk/rect");

    var Level = require("./level");

    var fps = $("#fps");

    var LevelSelect = function () {

    };

    LevelSelect.prototype.setup = function () {
        var count = levelSwapper.levels.length;
        var i, j, currentButton = 0, perLine = 2;

        this.pointer = new Pointer();
        this.field = new shapes.Rect({
            x: 5,
            y: 5,
            width: 640,
            height: 480
        });

        this.drawing = new Drawing();
        this.drawing.add(new Text({
            x:40,
            y:10,
            text: "Select Level",
            fillStyle: "Cornsilk",
            font: "54px Arial"
        }), "title");

        this.drawing.add(new Rect({
            x: 5,
            y: 5,
            width: 640,
            height: 550,
            strokeStyle: "Cornsilk"
        }), "border");

        this.levelButtons = new SpriteList();

        for (i = 0; currentButton < count; i++) {
            for (j = 0; j < perLine && currentButton < count; j++) {
                this.levelButtons.add(new Button({
                    x: 40 + j * 150,
                    y: 100 + i * 50,
                    text: levelSwapper.levels[currentButton].name,
                    minWidth: 100,
                    onClick: function (levelData) {
                        return function () {
                            levelSwapper.startLevel(Level, levelData.name);
                        };
                    }(levelSwapper.levels[currentButton])
                }, jaws.context));

                currentButton += 1;
            }
        }
    };

    LevelSelect.prototype.draw = function () {
        fps.html(jaws.game_loop.fps);
        jaws.clear();

        this.drawing.draw(jaws.context);
        this.levelButtons.draw(jaws.context);
        
        this.pointer.draw(jaws.context);

    };

    LevelSelect.prototype.update = function () {
        this.pointer.update(this.field);
        this.levelButtons.update(this.field);
    };

    LevelSelect.stateName = "LevelSelect";

    return LevelSelect;

});