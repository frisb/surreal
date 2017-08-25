"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializer_1 = require("./serializer");
function Surreal(transformer) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var serializer;
    if (typeof (transformer) === 'function') {
        serializer = new (transformer.bind.apply(transformer, [void 0].concat(args)))();
    }
    else if (transformer instanceof Array) {
        var props = transformer;
        serializer = new serializer_1.ArraySerializer(props);
    }
    else {
        var map = transformer;
        var useMappedPropertyName = args[0];
        serializer = new serializer_1.MapSerializer(map, useMappedPropertyName);
    }
    return {
        serializer: serializer,
        serializable: function (target) {
            if (!target)
                target = function fresh() { return; };
            target.prototype.toJSON = function () {
                return serializer.serialize(this);
            };
            target.prototype.fromJSON = function (record) {
                serializer.deserialize(record, this);
                return this;
            };
            return target;
        }
    };
}
exports.Surreal = Surreal;
//# sourceMappingURL=index.js.map