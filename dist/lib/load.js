"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dest) {
  var list = (0, _list2.default)(dest);

  return async function (plugin) {
    var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    var plugins = await list(namespace);

    if (!(plugin in plugins)) {
      log("Plugin " + plugin + " not installed");
      return {};
    }

    var dir = (0, _path.resolve)(dest, namespace, plugins[plugin].directory);
    var data = await (0, _FilesUtils.readPackage)(dir);
    var file = (0, _path.resolve)(dir, data.main);
    var exec = await (0, _FilesUtils.readFile)(file, "utf8");

    return function (context) {
      log("Executing " + plugin + " in " + dir);

      var vm = new _vm.NodeVM({
        console: "inherit",
        sandbox: context,
        require: {
          external: true,
          builtin: ["*"],
          root: dir
        }
      });

      return vm.run(exec, file);
    };
  };
};

var _debug = require("debug");

var _vm = require("vm2");

var _path = require("path");

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _FilesUtils = require("./utils/FilesUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var log = (0, _debug.debug)("qilin:load");