// @flow
import getPackages from "./getPackages";
import installPackage from "./installPackage";
import * as GitHubUtils from "./utils/GitHubUtils";

/**
 * Asynchronously checks if locally installed packages are up-to-date. If no,
 * those packages are fetched again.
 *
 * @example
 *  > Manager.updatePackages();
 *
 * @param   {object}  config
 * @return  {void}
 * @async
 */

export default function(config: Object): () => void {
  return function(): void {
    const fetchPackages = getPackages(config.dest);
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
            download.push(downloadPackage(external.repository));
          }
        });

        return Promise.all(download);
      });
    });
  };
}
