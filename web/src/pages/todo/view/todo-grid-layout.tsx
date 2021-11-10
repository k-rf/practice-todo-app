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

    const handleChangeLayout = async (
        layout: RGL.Layout[],
        newItem: RGL.Layout,
    ) => {
        const collection = layout
            .filter((e) => e.i !== newItem.i)
            .map((e) => {
                const todo = props.collection.findById(e.i);
                if (todo) {
                    return { ...todo, x: e.x, y: e.y, w: e.w, h: e.h };
                }
            })
            .filter(
                (e): e is Exclude<typeof e, undefined> =>
                    typeof e !== undefined,
            );

        const todo = props.collection.findById(newItem.i);
        if (todo) {
            await action.changeLayout(
                collection.concat({
                    ...todo,
                    x: newItem.x,
                    y: newItem.y,
                    w: newItem.w,
                    h: newItem.h,
                }),
            );
        } else {
            await action.changeLayout(collection);
        }
    };

    return (
        <ReactGridLayout
            className="layout"
            layout={items}
            cols={12}
            rowHeight={24}
            onResizeStop={(layout, _oldItem, newItem) => {
                handleChangeLayout(layout, newItem);
            }}
            onDragStop={(layout, _oldItem, newItem) => {
                handleChangeLayout(layout, newItem);
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
