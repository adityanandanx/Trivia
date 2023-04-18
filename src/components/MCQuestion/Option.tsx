"use client";
import {
    ButtonHTMLAttributes,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { ControlsContext } from "../Questions";

interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isCorrect: boolean;
    attempt: {
        attempted: boolean;
        setAttempted: Dispatch<SetStateAction<boolean>>;
    };
}

const Option: FC<OptionProps> = ({
    children,
    isCorrect,
    disabled,
    onClick,
    attempt,
    ...props
}) => {
    const [state, setState] = useState("neutral");
    const { attempted, setAttempted } = attempt;
    const controls = useContext(ControlsContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!controls) return;
        if (isCorrect === true) {
            controls.incrementScore();
            setState("correct");
        } else if (isCorrect === false) {
            setState("wrong");
        } else {
            setState("neutral");
        }
        setAttempted(true);
        setTimeout(() => {
            controls.next();
            setAttempted(false);
            setState("neutral");
        }, 500);
    };

    return (
        <button
            {...props}
            disabled={attempted}
            onClick={(event) => {
                handleClick(event);
            }}
            // style={}
            className={`p-4 w-full text-zinc-50 dark:text-zinc-900 rounded-md ${
                state === "correct"
                    ? "bg-green-500"
                    : state === "wrong"
                    ? "bg-red-500"
                    : "bg-zinc-900 dark:bg-zinc-50"
            }`}
        >
            {children}
        </button>
    );
};

export default Option;
