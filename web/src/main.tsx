import { ThemeProvider } from "@material-ui/styles";
import { theme } from "constants/theme";
import React from "react";
import ReactDOM from "react-dom";
import { SWRConfig } from "swr";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <SWRConfig>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </SWRConfig>
    </React.StrictMode>,
    document.getElementById("root"),
);
