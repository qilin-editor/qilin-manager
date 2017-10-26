// @flow
import fs from "fs";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export function isDirectory(source: string): boolean {
  return fs.lstatSync(source).isDirectory();
}

export function isPackage(source: string): boolean {
  return fs.existsSync(path.join(source, "package.json"));
}

export function readPackage(directory: string): Promise<Object> {
  const base = path.basename(path.dirname(directory));
  const file = path.resolve(directory, "package.json");

  return readFile(file, "utf8").then((data) => {
    try {
      data = JSON.parse(data);
      data.base = base;
      data.path = file;

      return data;
    } catch (error) {/* … */}
  });
}

export function updatePackage(
  directory: string,
  json: Object
): Promise<Object> {
  return readPackage(directory).then((data) => {
    return writeFile(data.path, JSON.stringify({
      ...data,
      ...json,
    }));
  });
}

export const isWindows: boolean = process.platform === "win32";
export const isMacOs: boolean = process.platform === "darwin";
export const isLinux: boolean = !isWindows && !isMacOs;
export const home: string = process.env[isWindows ? "USERPROFILE":"HOME"] || "";
