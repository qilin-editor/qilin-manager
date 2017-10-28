"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestOptions = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.parseRepository = parseRepository;
exports.getArchiveLink = getArchiveLink;
exports.getArchiveDir = getArchiveDir;
exports.getRawFileLink = getRawFileLink;
exports.getOrganizationRepos = getOrganizationRepos;
exports.getRepositoryPackage = getRepositoryPackage;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestOptions = exports.requestOptions = {
  headers: {
    "User-Agent": "qilin-editor"
  }
};
function parseRepository(link) {
  var branch = "master";
  var owner = link.split("/")[0];
  var name = link.split("/")[1];

  if (name.indexOf("#") > -1) {
    branch = name.split("#")[1];
    name = name.split("#")[0];
  }

  return { owner: owner, name: name, branch: branch };
}

function getArchiveLink(repo) {
  if ((typeof repo === "undefined" ? "undefined" : (0, _typeof3.default)(repo)) !== "object") {
    repo = parseRepository(repo);
  }

  return "https://github.com/" + repo.owner + "/" + repo.name + "/archive/" + repo.branch + ".zip";
}

function getArchiveDir(link) {
  var dir = link.split("/");

  return (dir[dir.length - 3] + "-" + dir[dir.length - 1]).slice(0, -4);
}

function getRawFileLink(repo, file) {
  if ((typeof repo === "undefined" ? "undefined" : (0, _typeof3.default)(repo)) !== "object") {
    repo = parseRepository(repo);
  }

  return "https://raw.githubusercontent.com/" + repo.owner + "/" + repo.name + "/" + repo.branch + "/" + file;
}

function getOrganizationRepos(organization, filter) {
  var url = "https://api.github.com/orgs/" + organization + "/repos";
  var req = _request2.default.defaults((0, _extends3.default)({}, requestOptions));

  return new Promise(function (resolve, reject) {
    req(url, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        try {
          var result = JSON.parse(body);
          var output = [];

          if (filter) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var repo = _step.value;

                if (repo.html_url.includes(filter)) {
                  output.push(repo);
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

          resolve(output);
        } catch (error) {
          reject(body);
        }
      }
    });
  });
}

function getRepositoryPackage(repo) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof repo === "undefined" ? "undefined" : (0, _typeof3.default)(repo)) !== "object") {
    repo = parseRepository(repo);
  }

  var req = _request2.default.defaults((0, _extends3.default)({}, requestOptions, {
    proxy: config.proxy
  }));

  return new Promise(function (resolve, reject) {
    req(getRawFileLink(repo, "package.json"), function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}