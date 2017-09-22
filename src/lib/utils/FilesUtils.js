import fs from "fs";

export function isDirectory(source) {
    return fs.lstatSync(source).isDirectory();
}

export function getHomeDir() {
    return process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
}
