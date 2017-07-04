"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var surrealizable_1 = require("./surrealizable");
var X = (function () {
    function X() {
    }
    Object.defineProperty(X, "staticA", {
        get: function () {
            return 'staticA';
        },
        enumerable: true,
        configurable: true
    });
    X.prototype.A = function () {
        return 'A';
    };
    return X;
}());
var Y = (function (_super) {
    __extends(Y, _super);
    function Y() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Y, "staticB", {
        get: function () {
            return 'staticB';
        },
        enumerable: true,
        configurable: true
    });
    Y.prototype.B = function () {
        return 'B';
    };
    return Y;
}(X));
Y = __decorate([
    surrealizable_1.Surrealizable({ see: 'C', dee: 'd' })
], Y);
var z = new Y();
console.log(z.staticA);
console.log(z.staticB);
console.log(z.staticC);
console.log(z.A());
console.log(z.B());
console.log(z.C());
console.log(z.see);
console.log(z.dee);
//# sourceMappingURL=_test.js.map