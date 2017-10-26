"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = undefined;
exports.isDirectory = isDirectory;
exports.isPackage = isPackage;
exports.readPackage = readPackage;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check whether a path is pointing to a directory or not.
 *
 * @param   {string}  source
 * @return  {boolean}
 */
function isDirectory(source) {
  return _fs2.default.lstatSync(source).isDirectory();
}

/**
 * Check whether a path is pointing to a valid package or not.
 *
 * @param   {string}  source
 * @return  {boolean}
 */
function isPackage(source) {
  return _fs2.default.existsSync(_path2.default.join(source, "package.json"));
}

/**
 * Resolve a dependency's `package.json` content from a specified directory.
 *
 * @param  {string}           dir
 * @return {Promise<Object>}
 */
function readPackage(dir) {
  var target = _path2.default.basename(_path2.default.dirname(dir));
  var file = _path2.default.resolve(dir, "package.json");

  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(file, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }

      try {
        var packageData = JSON.parse(data);
        packageData.target = target;
        packageData.path = file;

        resolve(packageData);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * Return the home directory depending on platform.
 *
 * @type  {string}
 */
var home = exports.home = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"] || "";