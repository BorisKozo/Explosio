define(["jquery", "jaws","./../sprites/pointer", "js/common/sprite_list"], function ($, jaws, Pointer, SpriteList) {


    var fps = $("#fps");

    var Level = function () {
        this.setup = function () {
            this.explosions = new SpriteList();
            this.pointer = new Pointer();
        };

        this.update = function () {
            this.explosions.update();
            this.pointer.update();
        };

        this.draw = function () {
            jaws.context.clearRect(0, 0, jaws.width, jaws.height);

            this.explosions.draw(jaws.context);
            this.pointer.draw(jaws.context);
            
            //circle.centerX = jaws.mouse_x;
            //circle.centerY = jaws.mouse_y;
            //circle.draw(jaws.context);
            //fps.html(jaws.game_loop.fps);
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