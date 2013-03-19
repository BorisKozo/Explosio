define(["jaws", "./states/level", "./states/level_select"], function (jaws, Level, LevelSelect) {
    var loader = {
        start: function () {
            //jaws.start(Level, { fps: 30 }, level2);
            jaws.start(LevelSelect, { fps: 30 });

        }
    };
    return loader;
});