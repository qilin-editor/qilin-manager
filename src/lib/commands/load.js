// @flow
import {debug as debugModule} from "debug";
import {NodeVM} from "vm2";
import {resolve} from "path";
import list from "./list";
import * as config from "../config";
import {readFile, readPackage} from "../utils/FilesUtils";

// For debug purpose only:
const log: Function = debugModule("qilin:load");

/**
 * Asynchronously loads then executes a script in a virtual machine (V8 sandbox)
 * and returns it's `module.exports` back to the client. All the dependencies
 * are resolved automatically.
 *
 * @param   {string}    moduleName
 * @param   {?string}   namespace
 * @return  {Promise<Function>}
 * @async
 */
export default async function(
  moduleName: string,
  namespace?: string = ""
): Promise<(context: Object) => Object> {
  const plugins = await list(namespace);
  const plugin = plugins[moduleName];

  if (!plugin) {
    log(`Plugin ${moduleName} not installed`);

    // @todo custom errors
    throw new Error();
  }

  const dir:string = resolve(config.dest, namespace, plugin.directory);
  const data:Object = await readPackage(dir);
  const file:string = resolve(dir, data.main);
  const exec:string = await readFile(file, "utf8");

  return (context) => {
    log(`Executing ${moduleName} in ${dir}`);

    const vm = new NodeVM({
      console: "inherit",
      sandbox: context,
      require: {
        external: true,
        builtin: ["*"], // @todo mock or remove some builtin for more security
        root: dir,
      },
    });

    return vm.run(exec, file);
  };
}
