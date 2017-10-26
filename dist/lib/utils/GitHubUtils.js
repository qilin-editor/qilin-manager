"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.parseRepository = parseRepository;
exports.getArchiveLink = getArchiveLink;
exports.getArchiveDir = getArchiveDir;
exports.getRawFileLink = getRawFileLink;
exports.getRepositoryPackage = getRepositoryPackage;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function getRepositoryPackage(repo) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof repo === "undefined" ? "undefined" : (0, _typeof3.default)(repo)) !== "object") {
    repo = parseRepository(repo);
  }

  var req = _request2.default.defaults({
    proxy: config.proxy
  });

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