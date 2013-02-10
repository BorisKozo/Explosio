define(["./states/level"], function (Level) {
    var loader = {
        start: function () {
            jaws.start(Level)

        }
    }
    return loader;
});