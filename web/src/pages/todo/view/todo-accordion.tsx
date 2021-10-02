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
                <RemoveIconButton
                    onClick={() => action.remove({ id: props.id })}
                />
            </AccordionActions>
        </Accordion>
    );
};
