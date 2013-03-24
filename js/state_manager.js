define(["require", "jaws", "./state_options", "./states/level", "./states/level_select", "./states/intro"], function (require, jaws, stateOptions) {

    function setState(State) {
        stateManager.states[State.stateName] = State;
        State.stateManager = stateManager;
    }

    var Level = require("./states/level");
    var LevelSelect = require("./states/level_select");
    var Intro = require("./states/intro");

    var stateManager = {
        states:{},
        start: function () {
            jaws.start(Intro, stateOptions);
        },
        changeState: function (stateName) {
            if (stateName && stateManager.states[stateName]) {
                jaws.switchGameState(stateManager.states[stateName], stateOptions);
            }
        }
    };
    setState(Level);
    setState(LevelSelect);
    setState(Intro);

    return stateManager;
});