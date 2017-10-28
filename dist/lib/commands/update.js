"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewVersions = getNewVersions;

var _debug = require("debug");

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _install = require("./install");

var _install2 = _interopRequireDefault(_install);

var _config = require("../config");

var config = _interopRequireWildcard(_config);

var _GitHubUtils = require("../utils/GitHubUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var log = (0, _debug.debug)("qilin:update");

/**
 * Fetches new versions directly from GitHub for a package list.
 *
 * @param   {Object}  packages
 * @return  {Promise<Array<Object>>}
 * @async
 */

function getNewVersions(packages) {
  return Promise.all(Object.keys(packages).map(function (id) {
    return (0, _GitHubUtils.getRepositoryPackage)(id, config);
  }));
}

/**
 * Asynchronously checks if locally installed packages under a certain namespace
 * are up-to-date. If no, they are downloaded again.
 *
 * @example
 *  qpm.update("plugins").then(…);
 *  qpm.update("themes").then(…);
 *  qpm.update().then(…);
 *
 * @param   {?string}   namespace
 * @return  {Promise<*>}
 * @async
 */

exports.default = async function (namespace) {
  var download = [];
  var packages = await (0, _list2.default)(namespace);
  var external = await getNewVersions(packages);

  external.forEach(function (e) {
    if (e.version !== packages[e.repository].version) {
      // eslint-disable-next-line
      log("Updating " + e.repository + ": " + packages[e.repository].version + " => " + e.version);

      download.push((0, _install2.default)(e.repository));
    }
  });

  return Promise.all(download);
};