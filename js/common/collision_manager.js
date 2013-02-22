define([], function () {
    var CollisionManager = function () {
        this.data = {};
    };

    CollisionManager.getIdByTypes = function (firstType, secondType) {
        return firstType + "$" + secondType;
    };

    CollisionManager.prototype.register = function (firstType, secondType, collider) {
        var id;

        id = CollisionManager.getIdByTypes(firstType, secondType);
        this.data[id] = collider;

        if (collider.symetric) {
            id = CollisionManager.getIdByTypes(secondType, firstType);
            this.data[id] = collider;
        }

    };

    CollisionManager.prototype.areColliding = function (sprite1, sprite2) {
        var typeString = CollisionManager.getIdByTypes(sprite1.type, sprite2.type),
    collider = this.data[typeString];

        if (!collider) {
            return false;
        }

        return collider.test(sprite1, sprite2);
    };

    CollisionManager.prototype.handleCollision = function (sprite1, sprite2) {

        if (!this.areColliding(sprite1, sprite2)) {
            return;
        }


        sprite1.beforeCollide(sprite2);
        sprite2.beforeCollide(sprite1);

        sprite1.collide(sprite2);
        sprite2.collide(sprite1);

        sprite1.afterCollide(sprite2);
        sprite2.afterCollide(sprite1);

    };

    return CollisionManager;
});