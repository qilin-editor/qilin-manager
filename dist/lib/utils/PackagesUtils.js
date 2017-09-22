"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPackageData = getPackageData;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getPackageData(dir) {
    return new Promise(function (resolve, reject) {
        _fs2["default"].readFile(_path2["default"].resolve(dir, "package.json"), "utf8", function (err, data) {
            if (err) {
                reject(err);
            }

            try {
                resolve(JSON.parse(data));
            } catch (error) {
                reject(error);
            }
        });
    });
}