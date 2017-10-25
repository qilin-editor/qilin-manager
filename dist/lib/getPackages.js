"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dest) {
  var files = (0, _fs.readdirSync)(dest).map(function (name) {
    return (0, _path.join)(dest, name);
  });
  var dirs = files.filter(_FilesUtils.isDirectory);

  return async function () {
    var versions = {};
    var promises = [];
    dirs.forEach(function (dir) {
      return promises.push((0, _PackagesUtils.getPackageData)(dir));
    });

    try {
      var packs = await Promise.all(promises);
      packs.forEach(function (pack) {
        return versions[pack.repository] = pack.version;
      });
    } catch (error) {/* … */}

    return versions;
  };
};

var _path = require("path");

var _fs = require("fs");

var _FilesUtils = require("./utils/FilesUtils");

var _PackagesUtils = require("./utils/PackagesUtils");