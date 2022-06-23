"use strict";
exports.__esModule = true;
exports.typeOrmConfigFactory = void 0;
var ormconfig_1 = require("../../ormconfig");
function typeOrmConfigFactory() {
    return ormconfig_1["default"].find(function (item) { return item.name === 'default'; });
}
exports.typeOrmConfigFactory = typeOrmConfigFactory;
