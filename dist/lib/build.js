"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LIFECYCLE_SCRIPTS = undefined;
exports.execute = execute;

var _child_process = require("child_process");

var _PackagesUtils = require("./utils/PackagesUtils");

var LIFECYCLE_SCRIPTS = exports.LIFECYCLE_SCRIPTS = ["preinstall", "postinstall", "prepare"];

function execute(directory, script) {
  var command = LIFECYCLE_SCRIPTS.indexOf(script) > -1 ? "npm run " + script : "npm " + script;

  return new Promise(function (resolve, reject) {
    var build = (0, _child_process.spawn)(command, {
      cwd: directory,
      env: process.env,
      shell: true
    });

    build.on("close", function (code) {
      console.log("child process exited with code " + code);
      resolve(code);
    });
  });
}

exports.default = async function (directory) {
  var data = await (0, _PackagesUtils.getPackageData)(directory);
  var init = await execute(directory, "install");

  if (init) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = LIFECYCLE_SCRIPTS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var script = _step.value;

        if (script in data.scripts) {
          await execute(directory, script);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};