"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports["default"] = function (source) {
    if ((typeof source === "undefined" ? "undefined" : _typeof(source)) === "object") {
        source = source.dest;
    }

    return function () {
        console.info("[qilin-manager] Listing from: " + String(source));

        var files = _fs2["default"].readdirSync(source).map(function (name) {
            return _path2["default"].join(source, name);
        });
        var dirs = files.filter(FilesUtils.isDirectory);
        var promises = [];

        dirs.forEach(function (dir) {
            promises.push(PackagesUtils.getPackageData(dir));
        });

        return Promise.all(promises).then(function (packs) {
            var versions = {};

            packs.forEach(function (pack) {
                console.info("[qilin-manager] Package: " + String(pack.repository) + " v" + String(pack.version));
                versions[pack.repository] = pack.version;
            });

            return versions;
        })["catch"](function (err) {
            console.error(err);
        });
    };
};

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _FilesUtils = require("./utils/FilesUtils");

var FilesUtils = _interopRequireWildcard(_FilesUtils);

var _PackagesUtils = require("./utils/PackagesUtils");

var PackagesUtils = _interopRequireWildcard(_PackagesUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = exports["default"];