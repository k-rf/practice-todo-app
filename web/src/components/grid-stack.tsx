import { Box, Paper, Theme, Typography, useTheme } from "@mui/material";
import { SxProps } from "@mui/system";
import { GridStack, GridStackElement, GridStackNode } from "gridstack";
import "gridstack/dist/gridstack.css";
import "gridstack/dist/h5/gridstack-dd-native";
import { useSnackbar } from "hooks/use-snackbar";
import { useTodoCollection } from "pages/todo/hooks/use-todo-collection";
import { Todo } from "pages/todo/model/todo";
import {
    createRef,
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    VFC,
} from "react";
import { RemoveIconButton } from "./remove-icon-button";

const styles: SxProps<Theme> = {
    display: "flex",
    padding: (theme) => theme.spacing(1),
};

const removeIconButtonStyles: SxProps<Theme> = {
    position: "absolute",
    // bottom: (theme) => theme.spacing(0),
    // right: (theme) => theme.spacing(0),
};

interface Props {
    items?: Todo[];
    backgroundColor?: string;
}

export const GridComponent: VFC<Props> = (props) => {
    const { items = [] } = props;
    const paperSx: SxProps<Theme> = {
        ...styles,
        backgroundColor: (theme) =>
            props.backgroundColor ?? theme.palette.background.paper,
    };

    const refs = useRef<Record<string, MutableRefObject<GridStackElement>>>({});
    const gridRef = useRef<GridStack>();
    const theme = useTheme();

    if (Object.keys(refs.current).length !== items.length) {
        items.forEach(({ id }) => {
            refs.current[id] =
                refs.current[id] ?? createRef<GridStackElement>();
        });
    }

    const { action } = useTodoCollection();
    const { action: snackbarAction } = useSnackbar();

    const handleRemove = useCallback(
        (id: string) => {
            action
                .remove({ id })
                .then(() => {
                    snackbarAction.success(`Todo を削除しました`);
                })
                .catch((e) => {
                    if (e instanceof Error) {
                        snackbarAction.alert(e.message);
                    }
                });
        },
        [action, snackbarAction],
    );

    useEffect(() => {
        gridRef.current =
            gridRef.current ??
            GridStack.init({
                cellHeight: theme.spacing(5),
                removable: "#trash",
                acceptWidgets: true,
                float: false,
            });

        const grid = gridRef.current;
        grid.batchUpdate();
        grid.removeAll(false);
        items.forEach(({ id }) => {
            grid.addWidget(refs.current[id].current, {
                id,
                minW: 3,
                minH: 2,
            });
        });
        grid.commit();
    }, [items, theme, handleRemove]);

    return (
        <>
            <div
                id="trash"
                style={{
                    padding: 8,
                    marginBottom: 16,
                }}
            >
                <div>hogehoge</div>
                <div>
                    <span>Drop here to remove!</span>
                </div>
            </div>
            <Box className="grid-stack">
                {items.map((e, i) => (
                    <Box
                        ref={refs.current[e.id]}
                        className="grid-stack-item"
                        key={i}
                    >
                        <Paper className="grid-stack-item-content" sx={paperSx}>
                            <Typography>{e.title}</Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: "flex" }}>
                                <RemoveIconButton
                                    onClick={() => handleRemove(e.id)}
                                    sx={{}}
                                />
                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </>
    );
};
