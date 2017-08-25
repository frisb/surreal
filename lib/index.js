"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("./serializer");
function Surreal(transformer, ...args) {
    let serializer;
    if (typeof (transformer) === 'function') {
        serializer = new transformer(...args);
    }
    else if (transformer instanceof Array) {
        let props = transformer;
        serializer = new serializer_1.ArraySerializer(props);
    }
    else {
        let map = transformer;
        let [useMappedPropertyName] = args;
        serializer = new serializer_1.MapSerializer(map, useMappedPropertyName);
    }
    return {
        serializer,
        serializable: function (target) {
            const original = target || function fresh() { return; };
            function construct(constructor, record, a) {
                const c = function () {
                    if (record !== null && typeof (record) === 'object')
                        serializer.deserialize(record, this);
                    return constructor.apply(this, a);
                };
                c.prototype = constructor.prototype;
                return new c();
            }
            let f = function (record, ...a) {
                return construct(original, record, a);
            };
            f.prototype = original.prototype;
            f.prototype.toJSON = function () {
                return serializer.serialize(this);
            };
            return f;
        }
    };
}
exports.Surreal = Surreal;
//# sourceMappingURL=index.js.map