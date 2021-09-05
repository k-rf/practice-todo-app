import type { Config } from "@jest/types";
import { readDirectory } from "../script/read-directory";

export default async (): Promise<Config.InitialOptions> => {
    const moduleNameMapper: Record<string, string> = (
        await readDirectory("src")
    ).reduce(
        (p, c) => ({
            ...p,
            [`^${c}/(.*)`]: `<rootDir>/../src/${c}/$1`,
        }),
        {},
    );

    return {
        preset: "ts-jest",
        rootDir: ".",
        testRegex: ".e2e-spec.ts$",
        transform: {
            "^.+\\.(t|j)s$": "ts-jest",
        },
        collectCoverageFrom: ["**/*.(t|j)s"],
        coverageDirectory: "../coverage",
        testEnvironment: "node",
        moduleFileExtensions: ["js", "json", "ts"],
        moduleNameMapper,
    };
};
