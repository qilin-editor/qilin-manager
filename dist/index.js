"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (!_fs2.default.existsSync(config.dest)) {
    _fs2.default.mkdirSync(config.dest);
  }

  return { load: _load2.default, list: _list2.default, build: _build2.default, update: _update2.default, search: _search2.default, install: _install2.default };
};

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _config = require("./lib/config");

var config = _interopRequireWildcard(_config);

var _load = require("./lib/commands/load");

var _load2 = _interopRequireDefault(_load);

var _list = require("./lib/commands/list");

var _list2 = _interopRequireDefault(_list);

var _build = require("./lib/commands/build");

var _build2 = _interopRequireDefault(_build);

var _update = require("./lib/commands/update");

var _update2 = _interopRequireDefault(_update);

var _search = require("./lib/commands/search");

var _search2 = _interopRequireDefault(_search);

var _install = require("./lib/commands/install");

var _install2 = _interopRequireDefault(_install);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];

/**
 * Returns a bunch of commands for further usage. Creates a dest direectory if
 * it does not exist yet.
 *
 * @example
 *  const qpm = new QilinManager();
 *  qpm.install(…);
 *  qpm.search(…);
 *  qpm.update(…);
 *  qpm.list(…);
 *  qpm.load(…);
 *  qpm.build(…);
 *
 * @return  {object}
 */