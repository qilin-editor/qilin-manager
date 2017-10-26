"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPackages = findPackages;

exports.default = function (dest) {
  return async function () {
    var directory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    var source = (0, _path.resolve)(dest, directory);
    var output = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = findPackages(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var pkg = _step.value;

        var data = await (0, _FilesUtils.readPackage)(pkg);
        output[data.legacyName] = data.version;
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
};

var _fs = require("fs");

var _path = require("path");

var _FilesUtils = require("./utils/FilesUtils");

/**
 * Returns an array of paths pointing to packages (each package must contain a
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
 * Asynchronously returns a list of installed packages in `dest` directory. The
 * returned list is an object whose keys correspond to packages names and values
 * to theirs respective versions:
 * - `name` field is the same as in package.json
 * - `version` field is the same as in package.json
 *
 * @example
 *  > Manager.list("directory");
 *  < {
 *      "packageA": "version",
 *      "packageB": "version",
 *      "packageC": "version",
 *    }
 *
 * @param   {string}  dest
 * @return  {Promise}
 * @async
 */