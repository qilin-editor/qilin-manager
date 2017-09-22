"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (config) {
    return function () {
        (0, _getPackages2["default"])(config.dest)().then(function (locals) {
            var promises = [];
            var install = (0, _installPackage2["default"])(config);

            Object.keys(locals).forEach(function (id) {
                promises.push(GitHubUtils.getRepositoryPackage(id, config));
            });

            return Promise.all(promises).then(function (externals) {
                promises = [];

                externals.forEach(function (external) {
                    var version = locals[external.repository];

                    if (external.version !== version) {
                        console.info("[qilin-manager] Updating " + String(external.repository) + "@" + String(version) + " to " + String(external.repository) + "@" + String(external.version));

                        promises.push(install(external.repository));
                    } else {
                        console.info("[qilin-manager] " + String(external.repository) + "@" + String(external.version) + " up to date");
                    }
                });

                return Promise.all(promises);
            })["catch"](function (err) {
                console.error(err);
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = exports["default"];