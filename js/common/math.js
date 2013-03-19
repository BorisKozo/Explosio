define([], function () {
    return {
        // Returns the distance between the point at (x1,y1) to the point at (x2,y2)
        distance: function (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1 - y2),2));
        },
        withinDistance: function (x1, y1, x2, y2, distance) {
            return Math.pow(distance, 2) > (Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        }
    };
});