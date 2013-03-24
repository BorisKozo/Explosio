define([], function () {

    return {
        name:"level 5",
        targets: [
            {
                type: "ball",
                options: {
                    radius: 25
                },
                count: 6
            },
            {
                type: "ball",
                options: {
                    radius: 20
                },
                count: 6

            }
        ],
        explosions: 2,
        goal: 4
    };
});