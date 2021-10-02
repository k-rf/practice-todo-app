import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { RemoveIconButton } from "components/remove-icon-button";
import { useSnackbar } from "hooks/use-snackbar";
import { useTodoCollection } from "../hooks/use-todo-collection";

const styles: SxProps<Theme> = {
    display: "block",
};

interface Props {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
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

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5">{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={styles}>
                <Typography>{props.description}</Typography>
                <Typography>{String(props.createdAt)}</Typography>
            </AccordionDetails>
            <AccordionActions>
                <RemoveIconButton onClick={handleRemove} />
            </AccordionActions>
        </Accordion>
    );
};
