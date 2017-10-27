"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = exports.isLinux = exports.isMacOs = exports.isWindows = exports.writeFile = exports.readFile = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.isDirectory = isDirectory;
exports.isPackage = isPackage;
exports.readPackage = readPackage;
exports.updatePackage = updatePackage;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = exports.readFile = _util2.default.promisify(_fs2.default.readFile);
var writeFile = exports.writeFile = _util2.default.promisify(_fs2.default.writeFile);

function isDirectory(source) {
  return _fs2.default.lstatSync(source).isDirectory();
}

function isPackage(source) {
  return _fs2.default.existsSync(_path2.default.join(source, "package.json"));
}

function readPackage(directory) {
  var base = _path2.default.basename(_path2.default.dirname(directory));
  var file = _path2.default.resolve(directory, "package.json");

  return readFile(file, "utf8").then(function (data) {
    try {
      data = JSON.parse(data);
      data.directory = directory;
      data.namespace = base;
      data.path = file;

      return data;
    } catch (error) {/* … */}
  });
}

function updatePackage(directory, json) {
  return readPackage(directory).then(function (data) {
    return writeFile(data.path, JSON.stringify((0, _extends3.default)({}, data, json)));
  });
}

var isWindows = exports.isWindows = process.platform === "win32";
var isMacOs = exports.isMacOs = process.platform === "darwin";
var isLinux = exports.isLinux = !isWindows && !isMacOs;
var home = exports.home = process.env[isWindows ? "USERPROFILE" : "HOME"] || "";