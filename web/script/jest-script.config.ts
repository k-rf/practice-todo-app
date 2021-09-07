import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
    return {
        preset: "ts-jest",
        rootDir: ".",
        testRegex: ".*\\.spec\\.ts$",
        transform: {
            "^.+\\.(t|j)s$": "ts-jest",
        },
        collectCoverageFrom: ["**/*.(t|j)s"],
        coverageDirectory: "./coverage",
        testEnvironment: "node",
        moduleFileExtensions: ["js", "json", "ts"],
    };
};
