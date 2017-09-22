"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (config) {
    function prepare(pack) {
        return new Promise(function (resolve) {
            (0, _child_process.exec)("npm run prepare", {
                cwd: pack
            }, function (error, stdout) {
                console.info("[qilin-manager] Preparing: " + String(pack));

                resolve(stdout);
            });
        });
    }

    function install(pack) {
        return new Promise(function (resolve) {
            (0, _child_process.exec)("npm install", {
                cwd: pack
            }, function (error, stdout) {
                console.info("[qilin-manager] Installing dependencies for: " + String(pack));

                resolve(stdout);
            });
        });
    }

    return function (link) {
        var repo = GitHubUtils.parseRepository(link);
        var archive = GitHubUtils.getArchiveLink(repo);

        console.info("[qilin-manager] Installing: " + String(archive));

        return (0, _download2["default"])(archive, config.dest, {
            extract: config.extract,
            proxy: config.proxy
        }).then(function () {
            var dir = GitHubUtils.getArchiveDir(archive);
            var pack = _path2["default"].resolve(config.dest, dir);

            return install(pack).then(function () {
                return prepare(pack);
            });
        });
    };
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _child_process = require("child_process");

var _download = require("download");

var _download2 = _interopRequireDefault(_download);

var _GitHubUtils = require("./utils/GitHubUtils");

var GitHubUtils = _interopRequireWildcard(_GitHubUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = exports["default"];