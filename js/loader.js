define(["jaws", "./states/level", "./level_data/level1", "./level_data/level2"], function (jaws, Level, level1, level2) {
    var loader = {
        start: function () {
            jaws.start(Level, { fps: 30 }, level2);

        }
    };
    return loader;
});