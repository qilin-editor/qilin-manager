// @flow
import {debug as debugModule} from "debug";
import path from "path";
import download from "download";
import build from "./build";
import * as GitHubUtils from "./utils/GitHubUtils";

// For debug purpose only:
const debug = debugModule("qilin:install");

/**
 * Asynchronously installs a specified package. Once downloaded, the package is
 * extracted in `dest` directory and properly prepared: its dependencies are
 * downloaded by NPM and a `prepare` script is launched if it exists.
 *
 * @example
 *  Promise.all([
 *    Manager.install("packageA"),
 *    Manager.install("packageA")
 *  ]).then(…);
 *
 * @param   {object}  config
 * @return  {Promise}
 * @async
 */

export default function(config: Object): (pack: string) => Promise<string> {
  return function(url: string, output: string = ""): Promise<string> {
    const repo = GitHubUtils.parseRepository(url);
    const link = GitHubUtils.getArchiveLink(repo);
    const dest = path.resolve(config.dest, output);

    debug(`Downloading ${url} from ${link}`);

    return download(link, dest, config).then(() => {
      debug(`Downloaded ${url}`);

      const dir = GitHubUtils.getArchiveDir(link);
      const pkg = path.resolve(dest, dir);

      return build(pkg);
    });
  };
}
