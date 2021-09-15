import * as fs from "fs";

export const readDirectory = (
    path: string,
    option?: { type: "directory" | "file" },
) => {
    return new Promise<Array<string>>((resolve, reject) => {
        fs.readdir(
            path,
            { encoding: "utf-8", withFileTypes: true },
            (err, files) => {
                if (err) {
                    reject(new Error(`The "${path}" is not able to open.`));
                    return;
                }

                switch (option?.type) {
                    case "directory":
                        resolve(
                            files
                                .filter((e) => e.isDirectory())
                                .map((e) => e.name),
                        );
                        return;
                    case "file":
                        resolve(
                            files.filter((e) => e.isFile()).map((e) => e.name),
                        );
                        return;
                    default:
                        resolve(files.map((e) => e.name));
                        return;
                }
            },
        );
    });
};
