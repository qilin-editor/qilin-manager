"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return function () {
    var fetchPackages = (0, _list2.default)(config.dest);
    var downloadPackage = (0, _install2.default)(config);
    var versions = [];
    var download = [];

    fetchPackages().then(function () {
      var locals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Object.keys(locals).forEach(function (id) {
        versions.push(GitHubUtils.getRepositoryPackage(id, config));
      });

      Promise.all(versions).then(function (externals) {
        externals.forEach(function (external) {
          if (external.version !== locals[external.repository]) {
            // eslint-disable-next-line
            debug("Updating " + external.repository + " from " + locals[external.repository] + " to " + external.version);

            download.push(downloadPackage(external.repository));
          } else {
            debug(external.repository + " up-to-date");
          }
        });

        return Promise.all(download);
      });
    });
  };
};

var _debug = require("debug");

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _install = require("./install");

var _install2 = _interopRequireDefault(_install);

var _GitHubUtils = require("./utils/GitHubUtils");

var GitHubUtils = _interopRequireWildcard(_GitHubUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var debug = (0, _debug.debug)("qilin:update");

/**
 * Asynchronously checks if locally installed packages are up-to-date. If no,
 * those packages are fetched again.
 *
 * @example
 *  Manager.update();
 *
 * @param   {object}  config
 * @return  {void}
 * @async
 */