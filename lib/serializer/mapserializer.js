"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapSerializer = (function () {
    function MapSerializer(map, useMappedPropertyName) {
        if (useMappedPropertyName === void 0) { useMappedPropertyName = true; }
        this.map = map;
        this.useMappedPropertyName = useMappedPropertyName;
    }
    MapSerializer.prototype.serialize = function (instance) {
        if (!instance)
            throw new Error('No serialization instance provided');
        var _a = this, map = _a.map, useMappedPropertyName = _a.useMappedPropertyName;
        var json = {};
        for (var srcKey in map) {
            var prop = srcKey;
            if (useMappedPropertyName) {
                prop = map[srcKey];
                if (!(prop && typeof (prop) === 'string'))
                    throw new Error("Invalid map destination property name \"" + prop + "\"");
            }
            var val = instance[srcKey];
            if (typeof (val) !== 'undefined')
                json[prop] = val;
        }
        return json;
    };
    MapSerializer.prototype.deserialize = function (source, instance) {
        if (!source)
            throw new Error('No source object provided');
        if (!instance)
            throw new Error('No serialization instance provided');
        var _a = this, map = _a.map, useMappedPropertyName = _a.useMappedPropertyName;
        for (var srcKey in map) {
            var prop = srcKey;
            if (useMappedPropertyName) {
                prop = map[srcKey];
                if (!(prop && typeof (prop) === 'string'))
                    throw new Error('Invalid map destination property name');
            }
            var val = source[prop];
            if (typeof (val) !== 'undefined')
                instance[srcKey] = val;
        }
    };
    return MapSerializer;
}());
exports.MapSerializer = MapSerializer;
//# sourceMappingURL=mapserializer.js.map