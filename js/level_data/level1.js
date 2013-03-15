define([], function () {

    return {
        name:"level 1",
        targets: [
            {
                type: "ball",
                options: {
                    radius: 15
                }
            },
            {
                type: "ball",
                options: {
                    radius: 25
                }
            }
        ],
        explosions: 2,
        goal: 0
    };
});