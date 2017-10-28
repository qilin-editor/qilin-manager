"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPackages = findPackages;

var _fs = require("fs");

var _path = require("path");

var _config = require("../config");

var config = _interopRequireWildcard(_config);

var _FilesUtils = require("../utils/FilesUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Returns an array of paths pointing to packages (each package contain a
 * `package.json` file).
 *
 * @param   {string}        directory
 * @return  {Array<string>}
 */
function findPackages(directory) {
  var output = [];
  try {
    output = (0, _fs.readdirSync)(directory).map(function (name) {
      return (0, _path.join)(directory, name);
    }).filter(_FilesUtils.isDirectory).filter(_FilesUtils.isPackage);
  } catch (error) {/* … */}

  return output;
}

/**
 * Asynchronously returns a list of installed packages in `dest` directory under
 * a given namespace. The returned list is an object whose keys correspond to
 * packages names and values are objects containing:
 * - `namespace`: plugin namespace;
 * - `directory`: plugin parent directory;
 * - `version`: same as in `package.json`;
 * - `package` : full path to `package.json`;
 *
 * @example
 *  > await qpm.list("some_namespace");
 *  < {
 *      "packageA": {
 *        "namespace": "some_namespace",
 *        "directory": "packageA-master",
 *        "version": "x.x.x",
 *        "package": "path/to/package.json"
 *      },
 *      "packageB": {
 *        "namespace": "some_namespace",
 *        "directory": "packageB-master",
 *        "version": "x.x.x",
 *        "package": "path/to/package.json"
 *      }
 *    }
 *
 * @param   {?string}   namespace
 * @return  {Promise<Object>}
 * @async
 */

exports.default = async function () {
  var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var source = (0, _path.resolve)(config.dest, namespace);
  var output = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = findPackages(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pkg = _step.value;

      var data = await (0, _FilesUtils.readPackage)(pkg);

      output[data.moduleName] = {
        namespace: data.namepsace,
        directory: data.directory,
        version: data.version,
        package: data.path
      };
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

  return output;
};