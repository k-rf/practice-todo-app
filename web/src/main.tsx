import { ThemeProvider } from "@mui/material";
import { theme } from "constants/theme";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <SWRConfig>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </SWRConfig>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root"),
);
