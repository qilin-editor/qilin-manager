// @flow
import fs from "fs";
import path from "path";
import util from "util";

export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);

export function isDirectory(source: string): boolean {
  return fs.lstatSync(source).isDirectory();
}

export function isPackage(source: string): boolean {
  return fs.existsSync(path.join(source, "package.json"));
}

export function readPackage(dir: string): Promise<Object> {
  const base = path.basename(path.dirname(dir));
  const file = path.resolve(dir, "package.json");

  return readFile(file, "utf8").then((data) => {
    try {
      data = JSON.parse(data);
      data.directory = dir;
      data.namespace = base;
      data.path = file;

      return data;
    } catch (error) {/* … */}
  });
}

export function updatePackage(dir: string, json: Object): Promise<Object> {
  return readPackage(dir).then((data) => {
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
