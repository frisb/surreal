"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fieldmap_1 = require("./fieldmap");
var buildproperties_1 = require("./buildproperties");
var inherit_1 = require("./inherit");
function create(fields, superConstructor) {
    var fieldMap = new fieldmap_1.FieldMap(fields);
    return (function () {
        function Model(initializer, aliased) {
            this.deserialize(initializer, aliased);
        }
        Model.extend = function (child, moreFields) {
            if (!child) {
                child = create(fieldMap.fields);
            }
            else if (!child.prototype) {
                moreFields = child;
                fieldMap.merge(moreFields);
                child = create(fieldMap.fields);
            }
            else {
                fieldMap.merge(moreFields);
                child.fieldMap = fieldMap;
            }
            inherit_1.inherit(child, this);
            child.fieldMap = fieldMap;
            buildproperties_1.buildProperties(child);
            return child;
        };
        Object.defineProperty(Model, "fieldMap", {
            get: function () {
                return fieldMap;
            },
            enumerable: true,
            configurable: true
        });
        Model.prototype.toString = function () {
            return this.serialize();
        };
        Model.prototype.serialize = function () {
            return JSON.stringify(this);
        };
        Model.prototype.deserialize = function (obj, aliased) {
            if (typeof (obj) === 'string')
                obj = JSON.parse(obj);
            for (var dest in obj) {
                if (obj.hasOwnProperty(dest)) {
                    var key = aliased ? fieldMap.getSrcKey(dest) : dest;
                    this[key] = obj[dest];
                }
            }
            return this;
        };
        Model.prototype.toJSON = function () {
            return this.toDocument();
        };
        Model.prototype.toDocument = function (aliased) {
            var doc = {};
            if (this.__d) {
                for (var i = 0, length_1 = this.__d.length; i < length_1; i++) {
                    var val = this.__d[i];
                    if (typeof (val) !== 'undefined') {
                        var src = fieldMap.src.keys[i];
                        var key = aliased ? fieldMap.getDestKey(src) : src;
                        doc[key] = this[src];
                    }
                }
            }
            return doc;
        };
        Model.prototype.init = function () {
            if (!this.__d) {
                this.__d = new Array(fieldMap.dest.keys.length);
                this.__p = new Array(fieldMap.dest.keys.length);
            }
        };
        Model.prototype.data = function (dest, val) {
            this.init();
            var i = fieldMap.dest.index[dest];
            if (typeof (val) !== 'undefined') {
                this.__d[i] = val;
                return;
            }
            else if (typeof (dest) !== 'undefined') {
                return this.__d[i];
            }
            else {
                return this.__d;
            }
        };
        Model.prototype.prev = function (dest) {
            var i = fieldMap.dest.index[dest];
            return this.__p[i];
        };
        Model.prototype.getValue = function (src) {
            var dest = fieldMap.getDestKey(src);
            console.log('getValue src', src, dest, this.data(dest));
            var val = this.data(dest);
            if (typeof (dest) === 'undefined')
                throw new Error("No value for key \"" + src + "\"");
            return this.data(dest);
        };
        Model.prototype.setValue = function (src, val) {
            var dest = fieldMap.getDestKey(src);
            var previousVal = this.data(dest);
            if (typeof (previousVal) !== 'undefined') {
                var i = fieldMap.dest.index[dest];
                this.__p[i] = previousVal;
            }
            if (val !== previousVal)
                this.data(dest, val);
            return dest;
        };
        return Model;
    }());
}
exports.create = create;
//# sourceMappingURL=model.js.map