"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function statics(child, parent) {
    for (var key in parent) {
        if (parent.hasOwnProperty(key))
            child[key] = parent[key];
    }
}
function constructor(child, parent) {
    var ctor = function () {
        this.constructor = child;
    };
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
}
function retrieveOriginalPrototype(child) {
    var proto = Object.create(null);
    var propNames = Object.getOwnPropertyNames(child.prototype);
    for (var i = 0, length_1 = propNames.length; i < length_1; i++) {
        var name_1 = propNames[i];
        proto[name_1] = child.prototype[name_1];
    }
    return proto;
}
function prototype(child, proto) {
    for (var key in proto) {
        child.prototype[key] = proto[key];
    }
}
function inherit(child, parent) {
    var original = retrieveOriginalPrototype(child);
    statics(child, parent);
    constructor(child, parent);
    prototype(child, original);
    return child;
}
exports.inherit = inherit;
//# sourceMappingURL=inherit.js.map