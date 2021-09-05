import { readDirectory } from "./read-directory";

describe("readDirectory 関数", () => {
    it("指定したディレクトリ内の一覧を取得する", async () => {
        const list = await readDirectory(__dirname + "/fixture");
        expect(list).toEqual(["directory-a", "directory-b", "file-c.txt"]);
    });

    it("指定したディレクトリが存在しないときエラー", async () => {
        const path = __dirname + "/not-existed-path";

        expect(readDirectory(path)).rejects.toThrowError(
            `The "${path}" is not able to open.`,
        );
    });
});
