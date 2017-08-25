"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapSerializer {
    constructor(map, useMappedPropertyName = true) {
        this.map = map;
        this.useMappedPropertyName = useMappedPropertyName;
    }
    serialize(instance) {
        if (!instance)
            throw new Error('No serialization instance provided');
        let { map, useMappedPropertyName } = this;
        let json = {};
        for (let srcKey in map) {
            let prop = srcKey;
            if (useMappedPropertyName) {
                prop = map[srcKey];
                if (!(prop && typeof (prop) === 'string'))
                    throw new Error(`Invalid map destination property name "${prop}"`);
            }
            let val = instance[srcKey];
            if (typeof (val) !== 'undefined')
                json[prop] = val;
        }
        return json;
    }
    deserialize(source, instance) {
        if (!source)
            throw new Error('No source object provided');
        if (!instance)
            throw new Error('No serialization instance provided');
        let { map, useMappedPropertyName } = this;
        for (let srcKey in map) {
            let prop = srcKey;
            if (useMappedPropertyName) {
                prop = map[srcKey];
                if (!(prop && typeof (prop) === 'string'))
                    throw new Error('Invalid map destination property name');
            }
            let val = source[prop];
            if (typeof (val) !== 'undefined')
                instance[srcKey] = val;
        }
    }
}
exports.MapSerializer = MapSerializer;
//# sourceMappingURL=mapserializer.js.map