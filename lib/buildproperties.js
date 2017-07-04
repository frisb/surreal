"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _defineProperty(prototype, src) {
    if (!prototype.hasOwnProperty(src)) {
        Object.defineProperty(prototype, src, {
            get: function () {
                return this.getValue(src);
            },
            set: function (val) {
                this.setValue(src, val);
            }
        });
    }
}
function buildProperties(Pseudo) {
    var fieldMap = Pseudo.fieldMap;
    var keys = fieldMap.src.keys;
    for (var i = 0, length_1 = keys.length; i < length_1; i++)
        _defineProperty(Pseudo.prototype, keys[i]);
}
exports.buildProperties = buildProperties;
//# sourceMappingURL=buildproperties.js.map