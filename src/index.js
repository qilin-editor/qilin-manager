// @flow
import path from "path";
import getPackages from "./lib/getPackages";
import updatePackage from "./lib/updatePackage";
import installPackage from "./lib/installPackage";
import * as FilesUtils from "./lib/utils/FilesUtils";

/**
 * Returns a bunch of pre-configured commands for further usage.
 *
 * @example
 *  const Manager = new QilinManager({
 *    // …
 *  });
 *
 *  Manager.install(…);
 *  Manager.update(…);
 *  Manager.list(…);
 *
 * @param   {Object}  options
 * @param   {string}  options.dest?
 * @param   {string}  options.proxy?
 * @param   {boolean} options.extract?
 * @return  {object}
 */
export default function(options: Object = {}): Object {
  const config: Object = {
    dest: path.resolve(FilesUtils.getHomeDir(), "./.qilin/"),
    proxy: "",
    extract: true,
    ...options,
  };

  return {
    install: installPackage(config),
    update: updatePackage(config),
    list: getPackages(config.dest),
  };
}
