import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactJsx from "vite-react-jsx";
import { readDirectory } from "./script/read-directory";

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const alias = (await readDirectory("src", { type: "directory" })).map(
        (e) => ({
            find: `${e}`,
            replacement: `${__dirname}/src/${e}`,
        }),
    );

    console.log(alias);

    return {
        plugins: [reactRefresh(), reactJsx()],
        server: { host: "0.0.0.0", port: 8080 },
        resolve: {
            alias,
        },
        optimizeDeps: { exclude: ["node_modules"] },
    };
});
