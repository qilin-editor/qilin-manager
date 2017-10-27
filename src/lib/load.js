// @flow
import {debug as debugModule} from "debug";
import {NodeVM} from "vm2";
import {resolve} from "path";
import listPackages from "./list";
import {readFile, readPackage} from "./utils/FilesUtils";

// For debug purpose only:
const log = debugModule("qilin:load");

export default function(dest: string): (
  plugin: string,
  namespace?: string
) => Promise<Object> {
  const list = listPackages(dest);

  return async function(
    plugin: string,
    namespace?: string = ""
  ): Promise<Object> {
    const plugins = await list(namespace);

    if (!(plugin in plugins)) {
      log(`Plugin ${plugin} not installed`);
      return {};
    }

    const dir:string = resolve(dest, namespace, plugins[plugin].directory);
    const data:Object = await readPackage(dir);
    const file:string = resolve(dir, data.main);
    const exec:string = await readFile(file, "utf8");

    return (context) => {
      log(`Executing ${plugin} in ${dir}`);

      const vm = new NodeVM({
        console: "inherit",
        sandbox: context,
        require: {
          external: true,
          builtin: ["*"],
          root: dir,
        },
      });

      return vm.run(exec, file);
    };
  };
}
