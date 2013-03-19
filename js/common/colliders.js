define(['./math'], function (math) {
    //A collider must have a "test" function which takes two object and tests if they collide.
    //* Returns true if the two objects collide and false otherwise *
    var _circleCircleCollider = {
        test: function (circle1, circle2) {
            return math.withinDistance(circle1.x, circle1.y, circle2.x, circle2.y, circle1.radius + circle2.radius);
        },
        symetric: true
    };

    return {
        circleCircle: _circleCircleCollider
    };
});