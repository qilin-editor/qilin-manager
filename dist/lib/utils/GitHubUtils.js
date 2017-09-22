"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.parseRepository = parseRepository;
exports.getArchiveLink = getArchiveLink;
exports.getArchiveDir = getArchiveDir;
exports.getRawFileLink = getRawFileLink;
exports.getRepositoryPackage = getRepositoryPackage;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parseRepository(link) {
    var owner = link.split("/")[0];
    var name = link.split("/")[1];
    var branch = "master";

    if (name.indexOf("#") > -1) {
        branch = name.split("#")[1];
        name = name.split("#")[0];
    }

    return {
        owner: owner,
        name: name,
        branch: branch
    };
}

function getArchiveLink(repo) {
    if ((typeof repo === "undefined" ? "undefined" : _typeof(repo)) !== "object") {
        repo = parseRepository(repo);
    }

    return "https://github.com/" + String(repo.owner) + "/" + String(repo.name) + "/archive/" + String(repo.branch) + ".zip";
}

function getArchiveDir(link) {
    var dir = link.split("/");

    return (String(dir[dir.length - 3]) + "-" + String(dir[dir.length - 1])).slice(0, -4);
}

function getRawFileLink(repo, file) {
    if ((typeof repo === "undefined" ? "undefined" : _typeof(repo)) !== "object") {
        repo = parseRepository(repo);
    }

    return "https://raw.githubusercontent.com/" + String(repo.owner) + "/" + String(repo.name) + "/" + String(repo.branch) + "/" + String(file);
}

function getRepositoryPackage(repo) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if ((typeof repo === "undefined" ? "undefined" : _typeof(repo)) !== "object") {
        repo = parseRepository(repo);
    }

    var req = _request2["default"].defaults({
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