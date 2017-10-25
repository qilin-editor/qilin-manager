"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPackageData = getPackageData;
exports.preparePackage = preparePackage;
exports.installDependencies = installDependencies;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve a dependency's `package.json` content from a specified directory.
 *
 * @param  {string}           dir
 * @return {Promise<Object>}
 */
function getPackageData(dir) {
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
function preparePackage(directory) {
  return new Promise(function (resolve) {
    (0, _child_process.exec)("npm run prepare", {
      cwd: directory
    }, function (error, stdout) {
      resolve(stdout);
    });
  });
}

function installDependencies(pack) {
  return new Promise(function (resolve) {
    (0, _child_process.exec)("npm install", {
      cwd: pack
    }, function (error, stdout) {
      resolve(stdout);
    });
  });
}