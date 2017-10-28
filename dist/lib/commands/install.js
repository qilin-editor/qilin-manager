"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _debug = require("debug");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _download = require("download");

var _download2 = _interopRequireDefault(_download);

var _build = require("./build");

var _build2 = _interopRequireDefault(_build);

var _config = require("../config");

var config = _interopRequireWildcard(_config);

var _GitHubUtils = require("../utils/GitHubUtils");

var GitHubUtils = _interopRequireWildcard(_GitHubUtils);

var _FilesUtils = require("../utils/FilesUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var log = (0, _debug.debug)("qilin:install");

/**
 * Asynchronously installs a specified package. Once downloaded, the package is
 * extracted in `dest` directory and properly prepared: its dependencies are
 * downloaded by NPM and build scripts are launched.
 *
 * @example
 *  Promise.all([
 *    qpm.install("packageA", "namespaceA"),
 *    qpm.install("packageB", "namespaceB"),
 *    qpm.install("packageC"),
 *  ]).then(…);
 *
 * @param   {string}    moduleName
 * @param   {?string}   namespace
 * @return  {Promise<string>}
 * @async
 */

exports.default = async function (moduleName) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var repo = GitHubUtils.parseRepository(moduleName);
  var link = GitHubUtils.getArchiveLink(repo);
  var dest = _path2.default.resolve(config.dest, namespace);

  log("Downloading " + moduleName + " from " + link);

  return (0, _download2.default)(link, dest, (0, _extends3.default)({}, config, {
    extract: true
  })).then(function () {
    log("Downloaded " + moduleName);

    var dir = GitHubUtils.getArchiveDir(link);
    var pkg = _path2.default.resolve(dest, dir);

    return (0, _FilesUtils.updatePackage)(pkg, {
      moduleName: moduleName
    }).then(function () {
      return (0, _build2.default)(pkg);
    });
  });
};

module.exports = exports["default"];