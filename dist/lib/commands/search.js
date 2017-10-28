"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GitHubUtils = require("../utils/GitHubUtils");

exports.default = async function (org, filter) {
  return (0, _GitHubUtils.getOrganizationRepos)(org, filter);
};

module.exports = exports["default"];