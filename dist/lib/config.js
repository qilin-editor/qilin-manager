"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxy = exports.dest = exports.env = undefined;

var _path = require("path");

var _FilesUtils = require("./utils/FilesUtils");

var env = exports.env = process.env;
var dest = exports.dest = env["QPM_HOME"] || (0, _path.resolve)(_FilesUtils.home, "./.qpm/");
var proxy = exports.proxy = env["QPM_PROXY"];