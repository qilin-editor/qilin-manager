"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var config = (0, _extends3.default)({
    dest: _path2.default.resolve(_FilesUtils.home, "./.qilin/"),
    extract: true
  }, options);

  // Create dest directory if it doesn't exist yet
  if (!_fs2.default.existsSync(config.dest)) {
    _fs2.default.mkdirSync(config.dest);
  }

  return {
    install: (0, _install2.default)(config),
    update: (0, _update2.default)(config),
    list: (0, _list2.default)(config.dest),
    load: (0, _load2.default)(config.dest),
    build: _build2.default
  };
};

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _load = require("./lib/load");

var _load2 = _interopRequireDefault(_load);

var _list = require("./lib/list");

var _list2 = _interopRequireDefault(_list);

var _build = require("./lib/build");

var _build2 = _interopRequireDefault(_build);

var _update = require("./lib/update");

var _update2 = _interopRequireDefault(_update);

var _install = require("./lib/install");

var _install2 = _interopRequireDefault(_install);

var _FilesUtils = require("./lib/utils/FilesUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }