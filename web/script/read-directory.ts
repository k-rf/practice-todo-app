import * as fs from "fs";

export const readDirectory = (path: string) => {
    return new Promise<Array<string>>((resolve, reject) => {
        fs.readdir(path, { encoding: "utf-8" }, (err, files) => {
            if (err) {
                reject(new Error(`The "${path}" is not able to open.`));
                return;
            }

            resolve(files);
            return;
        });
    });
};
