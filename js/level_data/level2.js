define([], function () {

    return {
        name: "level 2",
        targets: [
            {
                type: "ball",
                options: {
                    radius: 15
                },
                count: 5
            },
            {
                type: "ball",
                options: {
                    radius: 25
                },
                count: 7
            }
        ],
        explosions: 2,
        goal: 8
    };
});