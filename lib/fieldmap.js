"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldMap = (function () {
    function FieldMap(fields) {
        this.src = {
            keys: [],
            index: {}
        };
        this.dest = {
            keys: [],
            index: {}
        };
        this.count = 0;
        this.fields = {};
        this.merge(fields);
    }
    FieldMap.prototype.getSrcKey = function (dest) {
        return this.src.keys[this.dest.index[dest]];
    };
    FieldMap.prototype.getDestKey = function (src) {
        return this.dest.keys[this.src.index[src]];
    };
    FieldMap.prototype.add = function (s, d) {
        if (d === void 0) { d = s; }
        console.log('add', arguments);
        var _a = this, count = _a.count, fields = _a.fields, src = _a.src, dest = _a.dest;
        if (!src.index[s]) {
            fields[s] = d;
            src.keys.push(s);
            dest.keys.push(d);
            src.index[s] = count;
            dest.index[d] = count;
            this.count++;
        }
    };
    FieldMap.prototype.merge = function (fields) {
        if (fields) {
            if (typeof (fields) === 'string')
                fields = [fields];
            if (fields instanceof Array) {
                for (var i = 0, length_1 = fields.length; i < length_1; i++) {
                    this.add(fields[i]);
                }
            }
            else {
                for (var src in fields) {
                    if (fields.hasOwnProperty(src)) {
                        var dest = fields[src];
                        this.add(src, dest);
                    }
                }
            }
        }
    };
    return FieldMap;
}());
exports.FieldMap = FieldMap;
//# sourceMappingURL=fieldmap.js.map