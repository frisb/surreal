"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var surreal_1 = require("./surreal");
function Surrealizable(fields) {
    return function (target) {
        var Model = surreal_1.Surreal(fields);
        return Model.extend(target);
    };
}
exports.Surrealizable = Surrealizable;
//# sourceMappingURL=surrealizable.js.map