import { Fab, CircularProgress } from "@material-ui/core";
import { Check, PostAdd } from "@material-ui/icons";
import React, { useState } from "react";
import { green } from "@material-ui/core/colors";

const App = () => {
    const [value, setValue] = useState<"load" | "complete">("load");
    return (
        <>
            <Fab
                type="button"
                color="primary"
                onClick={() =>
                    setValue((old) => (old === "load" ? "complete" : "load"))
                }
            >
                <PostAdd />
            </Fab>
            {value === "load" ? (
                <CircularProgress variant="indeterminate" />
            ) : (
                <Fab
                    type="button"
                    style={{ color: green[900], backgroundColor: green[500] }}
                >
                    <Check />
                </Fab>
            )}
        </>
    );
};

export default App;
