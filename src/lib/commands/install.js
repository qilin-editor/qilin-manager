// @flow
import {debug as debugModule} from "debug";
import path from "path";
import download from "download";
import build from "./build";
import * as config from "../config";
import * as GitHubUtils from "../utils/GitHubUtils";
import {updatePackage} from "../utils/FilesUtils";

// For debug purpose only:
const log: Function = debugModule("qilin:install");

/**
 * Asynchronously installs a specified package. Once downloaded, the package is
 * extracted in `dest` directory and properly prepared: its dependencies are
 * downloaded by NPM and build scripts are launched.
 *
 * @example
 *  Promise.all([
 *    qpm.install("packageA", "namespaceA"),
 *    qpm.install("packageB", "namespaceB"),
 *    qpm.install("packageC"),
 *  ]).then(…);
 *
 * @param   {string}    moduleName
 * @param   {?string}   namespace
 * @return  {Promise<string>}
 * @async
 */
export default async function(
  moduleName: string,
  namespace?: string = ""
): Promise<string> {
  const repo = GitHubUtils.parseRepository(moduleName);
  const link = GitHubUtils.getArchiveLink(repo);
  const dest = path.resolve(config.dest, namespace);

  log(`Downloading ${moduleName} from ${link}`);

  return download(link, dest, {
    ...config,
    extract: true,
  }).then(() => {
    log(`Downloaded ${moduleName}`);

    const dir = GitHubUtils.getArchiveDir(link);
    const pkg = path.resolve(dest, dir);

    return updatePackage(pkg, {
      moduleName,
    }).then(() => build(pkg));
  });
}
