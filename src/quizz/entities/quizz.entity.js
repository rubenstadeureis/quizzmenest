"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuizzEntity = void 0;
var typeorm_1 = require("typeorm");
var QuizzEntity = /** @class */ (function () {
    function QuizzEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], QuizzEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true
        })
    ], QuizzEntity.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], QuizzEntity.prototype, "category");
    __decorate([
        (0, typeorm_1.Column)()
    ], QuizzEntity.prototype, "quantityPlayed");
    QuizzEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], QuizzEntity);
    return QuizzEntity;
}());
exports.QuizzEntity = QuizzEntity;
