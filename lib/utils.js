"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = exports.NOOP = exports.memorize = exports.memorizedQueryString = exports.memorizedGetConnectChar = void 0;
exports.memorizedGetConnectChar = memorize(getConnectChar);
exports.memorizedQueryString = memorize(queryString);
/**
 * @description 记忆化函数
 */
function memorize(fn) {
    var cache = {};
    function memo() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argsStr = JSON.stringify(Array.from(args));
        var val = cache[argsStr];
        return val || (cache[argsStr] = fn.apply(void 0, __spread(args)));
    }
    memo.cache = cache;
    return memo;
}
exports.memorize = memorize;
/**
 * @description 获取用于拼接的字符
 */
function getConnectChar(url) {
    return url.includes('?') ? '&' : '?';
}
/**
 * @description 拼接字符串与对象
 */
function queryString(url, data) {
    if (data === void 0) { data = {}; }
    return Reflect.ownKeys(data).reduce(function (url, item) {
        return "" + url + exports.memorizedGetConnectChar(url) + item + "=" + Reflect.get(data, item);
    }, url || '');
}
var NOOP = function () { };
exports.NOOP = NOOP;
function createResponse(xhr, isAllow) {
    return {
        code: xhr.status,
        msg: isAllow ? '请求成功！' : '请求失败！',
        data: JSON.parse(xhr.responseText)
    };
}
exports.createResponse = createResponse;
//# sourceMappingURL=utils.js.map