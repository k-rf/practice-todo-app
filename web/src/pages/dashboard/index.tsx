import { Header } from "components/header";
import { FC } from "react";

export const DashBoard: FC = (props) => {
    return (
        <>
            <Header title="Todo App" />
            <div>{props.children}</div>
        </>
    );
};
