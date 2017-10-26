"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return function (url) {
    var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    var repo = GitHubUtils.parseRepository(url);
    var link = GitHubUtils.getArchiveLink(repo);
    var dest = _path2.default.resolve(config.dest, output);

    log("Downloading " + url + " from " + link);

    return (0, _download2.default)(link, dest, config).then(function () {
      log("Downloaded " + url);

      var dir = GitHubUtils.getArchiveDir(link);
      var pkg = _path2.default.resolve(dest, dir);

      return (0, _FilesUtils.updatePackage)(pkg, {
        legacyName: url
      }).then(function () {
        return (0, _build2.default)(pkg);
      });
    });
  };
};

var _debug = require("debug");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _download = require("download");

var _download2 = _interopRequireDefault(_download);

var _build = require("./build");

var _build2 = _interopRequireDefault(_build);

var _GitHubUtils = require("./utils/GitHubUtils");

var GitHubUtils = _interopRequireWildcard(_GitHubUtils);

var _FilesUtils = require("./utils/FilesUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var log = (0, _debug.debug)("qilin:install");

/**
 * Asynchronously installs a specified package. Once downloaded, the package is
 * extracted in `dest` directory and properly prepared: its dependencies are
 * downloaded by NPM and a `prepare` script is launched if it exists.
 *
 * @example
 *  Promise.all([
 *    Manager.install("packageA"),
 *    Manager.install("packageA")
 *  ]).then(…);
 *
 * @param   {object}  config
 * @return  {Promise}
 * @async
 */