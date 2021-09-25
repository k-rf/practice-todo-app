import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";

const styles: SxProps<Theme> = {
    display: "block",
};

interface Props {
    title: string;
    description: string;
    createdAt: Date;
}

export const TodoAccordion = (props: Props) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5">{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={styles}>
                <Typography>{props.description}</Typography>
                <Typography>{String(props.createdAt)}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};
