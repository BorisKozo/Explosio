define(["require","jaws", "./state_options", "./states/level", "./states/level_select"], function (require, jaws, stateOptions) {

    function setState(State) {
        stateManager.states[State.stateName] = State;
        State.stateManager = stateManager;
    }

    var Level = require("./states/level");
    var LevelSelect = require("./states/level_select");

    var stateManager = {
        states:{},
        start: function () {
            jaws.start(LevelSelect, stateOptions);
        },
        changeState: function (stateName) {
            if (stateName && stateManager.states[stateName]) {
                jaws.switchGameState(stateManager.states[stateName], stateOptions);
            }
        }
    };
    setState(Level);
    setState(LevelSelect);

    return stateManager;
});