"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return function () {
    var fetchPackages = (0, _getPackages2.default)(config.dest);
    var downloadPackage = (0, _installPackage2.default)(config);
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
            download.push(downloadPackage(external.repository));
          }
        });

        return Promise.all(download);
      });
    });
  };
};

var _getPackages = require("./getPackages");

var _getPackages2 = _interopRequireDefault(_getPackages);

var _installPackage = require("./installPackage");

var _installPackage2 = _interopRequireDefault(_installPackage);

var _GitHubUtils = require("./utils/GitHubUtils");

var GitHubUtils = _interopRequireWildcard(_GitHubUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }