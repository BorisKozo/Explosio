define(["require", "jaws", "./state_options", "./level_data/level1", "./level_data/level2", "./level_data/level3",
        "./level_data/level4", "./level_data/level5", "./level_data/level6",
        "./level_data/level7", "./level_data/level8", "./level_data/level9",
        "./level_data/level10", "./level_data/level11", "./level_data/level12",
        "./level_data/level13", "./level_data/level14", "./level_data/level15",
        "./level_data/level16", "./level_data/level17", "./level_data/level18",
        "./level_data/level19", "./level_data/level20"], function (require, jaws, stateOptions) {
    var levels = [];
    levels.push(require("./level_data/level1"));
    levels.push(require("./level_data/level2"));
    levels.push(require("./level_data/level3"));
    levels.push(require("./level_data/level4"));
    levels.push(require("./level_data/level5"));
    levels.push(require("./level_data/level6"));
    levels.push(require("./level_data/level7"));
    levels.push(require("./level_data/level8"));
    levels.push(require("./level_data/level9"));
    levels.push(require("./level_data/level10"));
    levels.push(require("./level_data/level11"));
    levels.push(require("./level_data/level12"));
    //levels.push(require("./level_data/level13"));
    //levels.push(require("./level_data/level14"));
    //levels.push(require("./level_data/level15"));
    //levels.push(require("./level_data/level16"));
    //levels.push(require("./level_data/level17"));
    //levels.push(require("./level_data/level18"));
    //levels.push(require("./level_data/level19"));
    //levels.push(require("./level_data/level20"));

    function _getLevelData(levelId) {
        var i, length = swapper.levels.length;
        if (typeof (levelId) === "number") {
            if (levelId >= 0 && levelId < length) {
                return { levelData: swapper.levels[levelId], index: levelId };
            }
        } else {
            for (i = 0; i < length; i += 1) {
                if (swapper.levels[i].name === levelId) {
                    return { levelData: swapper.levels[i], index: i };
                }
            }
        }

        return null;
    }

    function _startLevel(Level, levelData) {
        jaws.switchGameState(Level, stateOptions, levelData);
    }

    var swapper = {
        levels: levels,
        startLevel: function (Level, levelId) {
            var result = _getLevelData(levelId).levelData;

            if (result) {
                _startLevel(Level, result);
            }
        },
        nextLevel: function (Level, levelName) {
            var result = _getLevelData(levelName), nextLevel;
            if (result) {
                nextLevel = _getLevelData(result.index + 1);
                if (nextLevel) {
                    _startLevel(Level, nextLevel.levelData);
                }
            }
        },
        isLastLevel: function (levelName) {
            var result = _getLevelData(levelName), nextLevel;
            if (result) {
                nextLevel = _getLevelData(result.index + 1);
                if (nextLevel) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    };

    return swapper;
});