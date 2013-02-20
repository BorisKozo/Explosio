define([], function () {
    var CollisionManager = function () {
        this.data = {};
    };

    CollisionManager.getIdByTypes = function (firstType, secondType) {
        return firstType + "$" + secondType;
    };

    CollisionManager.prototype.register = function (firstType, secondType, collider) {
        var fs = CollisionManager.getIdByTypes(firstType, secondType);
        this.data[fs] = collider;
    };

    CollisionManager.prototype.handleCollision = function (sprite1, sprite2) {
        var typeString = CollisionManager.getIdByTypes(sprite1.type, sprite2.type),
            collider = this.data[typeString];

        if (!collider) {
            return;
        }

        if (collider.test(sprite1, sprite2)) {
            sprite1.beforeCollide(sprite2);
            sprite2.beforeCollide(sprite1);

            sprite1.collide(sprite2);
            sprite2.collide(sprite1);

            sprite1.afterCollide(sprite2);
            sprite2.afterCollide(sprite1);
        }
    };

    return CollisionManager;
});