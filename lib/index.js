"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRkst = void 0;
var rkst_1 = require("./rkst");
function configureRkst(rkstConfig) {
    if (rkstConfig === void 0) { rkstConfig = {}; }
    return function (config) {
        return rkst_1.rkst(config, rkstConfig === null || rkstConfig === void 0 ? void 0 : rkstConfig.before, rkstConfig === null || rkstConfig === void 0 ? void 0 : rkstConfig.after);
    };
}
exports.configureRkst = configureRkst;
exports.default = rkst_1.rkst;
//# sourceMappingURL=index.js.map