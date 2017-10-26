// @flow
import {debug as debugModule} from "debug";
import listPackages from "./list";
import installPackage from "./install";
import * as GitHubUtils from "./utils/GitHubUtils";

// For debug purpose only:
const debug = debugModule("update");

/**
 * Asynchronously checks if locally installed packages are up-to-date. If no,
 * those packages are fetched again.
 *
 * @example
 *  Manager.update();
 *
 * @param   {object}  config
 * @return  {void}
 * @async
 */

export default function(config: Object): () => void {
  return function(): void {
    const fetchPackages = listPackages(config.dest);
    const downloadPackage = installPackage(config);
    const versions = [];
    const download = [];

    fetchPackages().then((locals = {}) => {
      Object.keys(locals).forEach((id) => {
        versions.push(GitHubUtils.getRepositoryPackage(id, config));
      });

      Promise.all(versions).then((externals) => {
        externals.forEach((external) => {
          if (external.version !== locals[external.repository]) {
            // eslint-disable-next-line
            debug(`Updating ${external.repository} from ${locals[external.repository]} to ${external.version}`);

            download.push(downloadPackage(external.repository));
          } else {
            debug(`${external.repository} up-to-date`);
          }
        });

        return Promise.all(download);
      });
    });
  };
}
