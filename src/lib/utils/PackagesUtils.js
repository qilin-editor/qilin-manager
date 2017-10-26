// @flow
import fs from "fs";
import path from "path";

/**
 * Resolve a dependency's `package.json` content from a specified directory.
 *
 * @param  {string}           dir
 * @return {Promise<Object>}
 */
export function getPackageData(dir: string): Promise<Object> {
  const target:string = path.basename(path.dirname(dir));
  const file:string = path.resolve(dir, "package.json");

  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }

      try {
        const packageData = JSON.parse(data);
        packageData.target = target;
        packageData.path = file;

        resolve(packageData);
      } catch (error) {
        reject(error);
      }
    });
  });
}
