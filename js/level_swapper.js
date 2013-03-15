define(["require","jaws","./level_data/level1","./level_data/level2"], function (require,jaws) {
    var levels = [];
    levels.push(require("./level_data/level1"));
    levels.push(require("./level_data/level2"));
    function _getLevelData(levelId) {
        var i, length = swapper.levels.length;
        if (typeof (levelId) === "number") {
            if (levelId >= 0 && levelId < length) {
                return { levelData: swapper.levels[level], index: levelId };
            }
        } else {
            for (i = 0; i < length; i += 1) {
                if (swapper.levels[i].name === levelId) {
                    return { levelData: swapper.levels[i], index: i };
                }
            }
        }

        return null;
    };

    function _startLevel(Level, levelData) {
        jaws.switchGameState(Level, { fps: 30 }, levelData);
    };

    var swapper = {
        levels: levels,
        startLevel: function (Level, levelId) {
            var result = _getLevelData(levelId).levelData;

            if (result) {
                _startLevel(Level, result);
            }
        },
        nextLevel: function (Level, currentLevel) {
            var result = _getLevelData(currentLevel.name), nextLevel;
            if (result) {
                nextLevel = _getLevelData(result.index + 1);
                if (nextLevel) {
                    _startLevel(Level, nextLevel.levelData);
                }
            }
        },
        isLastLevel: function (currentLevel) {
            var result = _getLevelData(currentLevel.name), nextLevel;
            if (result) {
                nextLevel = _getLevelData(result.index + 1);
                if (nextLevel) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    return swapper;
});