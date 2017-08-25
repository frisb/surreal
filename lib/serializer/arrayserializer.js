"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArraySerializer {
    constructor(props) {
        this.props = props;
    }
    serialize(instance) {
        if (!instance)
            throw new Error('No serialization instance provided');
        let { props } = this;
        let json = {};
        for (let i = 0, { length } = props; i < length; i++) {
            let key = props[i];
            if (!instance.hasOwnProperty(key))
                throw new Error('Invalid instance property name');
            let val = instance[key];
            if (typeof (val) !== 'undefined')
                json[key] = val;
        }
        return json;
    }
    deserialize(source, instance) {
        if (!source)
            throw new Error('No source object provided');
        if (!instance)
            throw new Error('No serialization instance provided');
        let { props } = this;
        for (let i = 0, { length } = props; i < length; i++) {
            let key = props[i];
            let val = source[key];
            if (typeof (val) !== 'undefined')
                instance[key] = val;
        }
    }
}
exports.ArraySerializer = ArraySerializer;
//# sourceMappingURL=arrayserializer.js.map