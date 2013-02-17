define(["jaws","./states/level"], function (jaws, Level) {
    var loader = {
        start: function () {
            jaws.start(Level)

        }
    }
    return loader;
});