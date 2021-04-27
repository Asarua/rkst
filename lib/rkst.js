"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rkst = void 0;
var defaultConfig_1 = require("./defaultConfig");
var utils_1 = require("./utils");
function rkst(config, before, after) {
    var _a;
    var options = config;
    if (typeof before === 'function') {
        Object.assign(options, before(options));
    }
    options = Object.assign({}, defaultConfig_1.defaultConfig, options);
    if (((_a = options.headers) === null || _a === void 0 ? void 0 : _a['ContentType']) === "application/x-www-form-urlencoded" /* URL_ENCODED */) {
        options.url = utils_1.memorizedQueryString(options.url, options.body);
    }
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = options.timeOut || 10000;
        xhr.open(options.methods, options.url);
        Object.keys(options.headers || {}).forEach(function (item) {
            xhr.setRequestHeader(item, Reflect.get(options.headers || {}, item));
        });
        xhr.send(JSON.stringify(options.body));
        xhr.onreadystatechange = function () {
            var allowCodes = [options.allowCode].flat(Infinity);
            if (xhr.readyState === 4) {
                var isAllow = allowCodes.some(function (code) { return code === xhr.status; });
                var operation = isAllow ? resolve : reject;
                var data = utils_1.createResponse(xhr, isAllow);
                if (typeof after === 'function') {
                    data = after(data);
                }
                operation(data);
            }
        };
    });
}
exports.rkst = rkst;
//# sourceMappingURL=rkst.js.map