"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UsersRepository = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./entities/user.entity");
var UsersRepository = /** @class */ (function () {
    function UsersRepository(userRepository) {
        this.userRepository = userRepository;
    }
    UsersRepository.prototype.create = function (QuizzEntity) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = this.userRepository.create(QuizzEntity);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_1 = _a.sent();
                        console.log('Erro na criação do quizz', error_1);
                        throw new common_1.InternalServerErrorException('Erro na criação do quizz');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersRepository.prototype.hasName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var countById, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.count({
                                where: {
                                    name: name
                                }
                            })];
                    case 1:
                        countById = _a.sent();
                        return [2 /*return*/, countById > 0];
                    case 2:
                        error_2 = _a.sent();
                        console.log('Erro ao verificar o quizz pelo nome', error_2);
                        throw new common_1.InternalServerErrorException('Erro ao verificar quizz pelo nome');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersRepository.prototype.listQuizz = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        throw new common_1.InternalServerErrorException('Erro na busca', error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersRepository.prototype.getQuizzById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundOneQuizzById, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        foundOneQuizzById = _a.sent();
                        return [2 /*return*/, foundOneQuizzById];
                    case 2:
                        error_4 = _a.sent();
                        console.log("Erro ao encontrar o quizz n\u00FAmero ".concat(id), error_4);
                        throw new common_1.InternalServerErrorException("Erro ao encontrar o quizz n\u00FAmero ".concat(id));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersRepository.prototype.QuizzExists = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var quizzFoundedByQuizz, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.count({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        quizzFoundedByQuizz = _a.sent();
                        return [2 /*return*/, quizzFoundedByQuizz > 0];
                    case 2:
                        error_5 = _a.sent();
                        console.log('Erro ao verificar o Id do quizz', error_5);
                        throw new common_1.InternalServerErrorException('Erro ao verificar o Id do quizz');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersRepository.prototype.deleteQuizzById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository["delete"](id)];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                    case 2:
                        error_6 = _a.sent();
                        console.log('Erro ao deletar o quizz', error_6);
                        throw new common_1.InternalServerErrorException('Erro no servidor');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersRepository.prototype.updateQuizzById = function (updateQuizz, id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundedOneQuizzById, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        foundedOneQuizzById = _a.sent();
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, foundedOneQuizzById), updateQuizz))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_7 = _a.sent();
                        console.log('Erro ao atualizar o quizz', error_7);
                        throw new common_1.InternalServerErrorException('Erro ao atualizar o quizz');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersRepository = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.QuizzEntity))
    ], UsersRepository);
    return UsersRepository;
}());
exports.UsersRepository = UsersRepository;
