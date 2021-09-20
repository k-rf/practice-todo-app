import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    makeStyles,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { FC } from "react";

const useStyles = makeStyles(() => ({
    details: {
        display: "block",
    },
}));

interface Props {
    title: string;
    description: string;
    createdAt: Date;
}

export const TodoAccordion: FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5">{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <Typography>{props.description}</Typography>
                <Typography>{String(props.createdAt)}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};
