import fs from "fs";
import path from "path";

export function getPackageData(dir) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(dir, "package.json"), "utf8", (err, data) => {
            if (err) {
                reject(err);
            }

            try {
                resolve(JSON.parse(data));
            } catch (error) {
                reject(error);
            }
        });
    });
}
