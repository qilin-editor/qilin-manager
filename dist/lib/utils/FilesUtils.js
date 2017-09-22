"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDirectory = isDirectory;
exports.getHomeDir = getHomeDir;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isDirectory(source) {
    return _fs2["default"].lstatSync(source).isDirectory();
}

function getHomeDir() {
    return process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
}