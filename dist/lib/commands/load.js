"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require("debug");

var _vm = require("vm2");

var _path = require("path");

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _config = require("../config");

var config = _interopRequireWildcard(_config);

var _FilesUtils = require("../utils/FilesUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var log = (0, _debug.debug)("qilin:load");

/**
 * Asynchronously loads then executes a script in a virtual machine (V8 sandbox)
 * and returns it's `module.exports` back to the client. All the dependencies
 * are resolved automatically.
 *
 * @param   {string}    moduleName
 * @param   {?string}   namespace
 * @return  {Promise<Function>}
 * @async
 */

exports.default = async function (moduleName) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var plugins = await (0, _list2.default)(namespace);
  var plugin = plugins[moduleName];

  if (!plugin) {
    log("Plugin " + moduleName + " not installed");

    // @todo custom errors
    throw new Error();
  }

  var dir = (0, _path.resolve)(config.dest, namespace, plugin.directory);
  var data = await (0, _FilesUtils.readPackage)(dir);
  var file = (0, _path.resolve)(dir, data.main);
  var exec = await (0, _FilesUtils.readFile)(file, "utf8");

  return function (context) {
    log("Executing " + moduleName + " in " + dir);

    var vm = new _vm.NodeVM({
      console: "inherit",
      sandbox: context,
      require: {
        external: true,
        builtin: ["*"], // @todo mock or remove some builtin for more security
        root: dir
      }
    });

    return vm.run(exec, file);
  };
};

module.exports = exports["default"];