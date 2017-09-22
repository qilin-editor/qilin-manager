"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var config = _extends({
        dest: _path2["default"].resolve(FilesUtils.getHomeDir(), "./.qilin/"),
        proxy: "",
        extract: true
    }, options);

    return {
        install: require("./lib/installPackage")(config),
        update: require("./lib/updatePackage")(config),
        list: require("./lib/getPackages")(config)
    };
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _FilesUtils = require("./lib/utils/FilesUtils");

var FilesUtils = _interopRequireWildcard(_FilesUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = exports["default"];