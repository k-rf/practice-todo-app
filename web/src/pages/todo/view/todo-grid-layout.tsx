import { Box } from "@mui/material";
import { useState, VFC } from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoCollection } from "../model/todo-collection";
import { TodoPaper } from "./todo-paper";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

interface Props {
    collection: TodoCollection;
}

export const TodoGridLayout: VFC<Props> = (props) => {
    const data = props.collection.value;
    const items: Layout[] = data.map((e) => ({
        i: e.id,
        x: e.x,
        y: e.y,
        w: e.w,
        h: e.h,
        minW: 2,
        minH: 2,
        maxW: 6,
        maxH: 6,
    }));

    const { action } = useTodoCollection();
    const [hover, setHover] = useState(-1);

    const handleHover = (index: number) => {
        setHover(index);
    };

    const handleUnhover = () => {
        setHover(-1);
    };

    const handleChangeLayout = (newItem: {
        x: number;
        y: number;
        w: number;
        h: number;
        i: string;
    }) => {
        const todo = props.collection.findById(newItem.i);
        if (todo) {
            action.changeLayout({
                ...todo,
                x: newItem.x,
                y: newItem.y,
                w: newItem.w,
                h: newItem.h,
            });
        }
    };

    return (
        <ReactGridLayout
            className="layout"
            layout={items}
            cols={12}
            rowHeight={24}
            onResizeStop={(layout, oldItem, newItem) => {
                handleChangeLayout(newItem);
            }}
            onDragStop={(_layout, _oldItem, newItem) => {
                handleChangeLayout(newItem);
            }}
            onLayoutChange={(layout) => {
                console.log("onLayoutChange");
                layout.forEach((newItem) => {
                    handleChangeLayout(newItem);
                });
            }}
        >
            {data.map((e, i) => (
                <Box key={e.id}>
                    <TodoPaper
                        onMouseEnter={() => handleHover(i)}
                        onMouseLeave={handleUnhover}
                        hover={hover === i}
                        {...e}
                    />
                </Box>
            ))}
        </ReactGridLayout>
    );
};
