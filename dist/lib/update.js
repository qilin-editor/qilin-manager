"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewVersions = getNewVersions;

exports.default = function (config) {
  var list = (0, _list2.default)(config.dest);
  var install = (0, _install2.default)(config);

  return async function (directory) {
    var download = [];
    var packages = await list(directory);
    var external = await getNewVersions(packages, config);

    external.forEach(function (e) {
      if (e.version !== packages[e.repository]) {
        // eslint-disable-next-line
        log("Updating " + e.repository + ": " + packages[e.repository] + " => " + e.version);

        download.push(install(e.repository));
      }
    });

    return Promise.all(download);
  };
};

var _debug = require("debug");

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _install = require("./install");

var _install2 = _interopRequireDefault(_install);

var _GitHubUtils = require("./utils/GitHubUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var log = (0, _debug.debug)("qilin:update");

function getNewVersions(packages, config) {
  return Promise.all(Object.keys(packages).map(function (id) {
    return (0, _GitHubUtils.getRepositoryPackage)(id, config);
  }));
}

/**
 * Asynchronously checks if locally installed packages are up-to-date. If no,
 * those packages are fetched again.
 *
 * @example
 *  Manager.update("plugins");
 *  Manager.update("themes");
 *  Manager.update();
 *
 * @param   {object}  config
 * @return  {void}
 * @async
 */