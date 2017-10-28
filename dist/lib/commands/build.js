"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LIFECYCLE_SCRIPTS = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.execute = execute;

var _debug = require("debug");

var _child_process = require("child_process");

var _FilesUtils = require("../utils/FilesUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For debug purpose only:
var log = (0, _debug.debug)("qilin:build");

/**
 * Scripts which should be executed in order to build a dependency.
 *
 * @see   https://docs.npmjs.com/misc/scripts
 * @type  {Array<string>}
 */

var LIFECYCLE_SCRIPTS = exports.LIFECYCLE_SCRIPTS = [];

/**
 * Executes a given NPM script in a specified directory.
 *
 * @param   {string}  directory
 * @param   {string}  script
 * @return  {Promise<number>}
 */
function execute(directory, script) {
  var depName = directory.split("/").pop();
  var command = LIFECYCLE_SCRIPTS.indexOf(script) > -1 ? "npm run " + script : "npm " + script;

  log("Executing \"" + command + "\" for " + depName);

  return new Promise(function (resolve, reject) {
    var build = (0, _child_process.spawn)(command, {
      cwd: directory,
      env: (0, _extends3.default)({}, process.env, { NODE_ENV: "development" }),
      shell: true
    });

    build.on("close", function (code) {
      log("Terminated \"" + script + "\" for " + depName + " with code " + code);

      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

/**
 * Installs dependencies for a given package and executes several NPM scripts in
 * order to build the plugin.
 *
 * Scripts are executes in the order below:
 * 1. preinstall
 * 2. install
 * 3. postinstall
 * 4. prepare
 *
 * @example
 *  qpm.build("path/to/package_A");
 *  qpm.build("path/to/package_B");
 *
 * @param   {string}  directory
 * @async
 */

exports.default = async function (directory) {
  var data = await (0, _FilesUtils.readPackage)(directory);
  var init = await execute(directory, "install");

  if (init) {
    log("Installed dependencies for " + data.name);
  }

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
};