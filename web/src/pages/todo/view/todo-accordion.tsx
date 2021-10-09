import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { RemoveIconButton } from "components/remove-icon-button";
import { useSnackbar } from "hooks/use-snackbar";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoStatus } from "../model/todo-status";

const accordionDetailsStyles: SxProps<Theme> = {
    display: "block",
};

const listItemLabelStyles: SxProps<Theme> = {
    width: (theme) => theme.spacing(8),
};

const listItemContentStyles: SxProps<Theme> = {
    width: "100%",
    wordWrap: "break-word",
    wordBreak: "break-all",
};

const removeIconButtonStyles: SxProps<Theme> = {
    position: "absolute",
    bottom: (theme) => theme.spacing(0),
    right: (theme) => theme.spacing(0),
};

interface Props {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    status: TodoStatus;
    completedAt?: Date;
}

export const TodoAccordion = (props: Props) => {
    const { action } = useTodoCollection();
    const { action: snackbarAction } = useSnackbar();

    const handleRemove = () => {
        action
            .remove({ id: props.id })
            .then(() => {
                snackbarAction.success(`Todo を削除しました`);
            })
            .catch((e) => {
                if (e instanceof Error) {
                    snackbarAction.alert(e.message);
                }
            });
    };

    const handleChangeStatus = () => {
        const nextStatus = props.status === "DONE" ? "PENDING" : "DONE";
        action.changeStatus({ id: props.id, status: nextStatus }).catch((e) => {
            if (e instanceof Error) {
                snackbarAction.alert(e.message);
            }
        });
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Checkbox
                    size="small"
                    checked={props.status === "DONE"}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleChangeStatus();
                    }}
                />
                <Typography variant="h5">{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
                <List>
                    <ListItem>
                        <Typography fontWeight="bold" sx={listItemLabelStyles}>
                            詳細
                        </Typography>
                        <Typography sx={listItemContentStyles}>
                            {props.description}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography fontWeight="bold" sx={listItemLabelStyles}>
                            作成日
                        </Typography>
                        <Typography sx={listItemContentStyles}>
                            {props.createdAt.toLocaleString()}
                        </Typography>
                    </ListItem>
                    {props.completedAt && (
                        <ListItem>
                            <Typography
                                fontWeight="bold"
                                sx={listItemLabelStyles}
                            >
                                完了日
                            </Typography>
                            <Typography sx={listItemContentStyles}>
                                {props.completedAt.toLocaleString()}
                            </Typography>
                        </ListItem>
                    )}
                </List>
                <div style={{ position: "relative" }}>
                    <RemoveIconButton
                        onClick={handleRemove}
                        sx={removeIconButtonStyles}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};
