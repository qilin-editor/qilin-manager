"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Returns a bunch of pre-configured commands for further usage.
 *
 * @example
 *  const Manager = new QilinManager({
 *    // …
 *  });
 *
 *  Manager.install(…);
 *  Manager.update(…);
 *  Manager.list(…);
 *
 * @param   {Object}  options
 * @param   {string}  options.dest?
 * @param   {string}  options.proxy?
 * @param   {boolean} options.extract?
 * @return  {object}
 */


exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var config = _extends({
    dest: _path2.default.resolve(FilesUtils.getHomeDir(), "./.qilin/"),
    proxy: "",
    extract: true
  }, options);

  return {
    install: (0, _install2.default)(config),
    update: (0, _update2.default)(config),
    list: (0, _list2.default)(config.dest)
  };
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _list = require("./lib/list");

var _list2 = _interopRequireDefault(_list);

var _update = require("./lib/update");

var _update2 = _interopRequireDefault(_update);

var _install = require("./lib/install");

var _install2 = _interopRequireDefault(_install);

var _FilesUtils = require("./lib/utils/FilesUtils");

var FilesUtils = _interopRequireWildcard(_FilesUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }