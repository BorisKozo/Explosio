define([], function () {
    return {
        // Returns the distance between the point at (x1,y1) to the point at (x2,y2)
        distance: function (x1, y1, x2, y2) {
            return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        }
    };
});