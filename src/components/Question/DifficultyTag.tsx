import { Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ComponentProps, FC, HTMLAttributes } from "react";

interface DifficultyTagProps extends HTMLAttributes<HTMLSpanElement> {
    difficulty: Difficulty;
}

const DifficultyTag: FC<DifficultyTagProps> = ({
    difficulty,
    className,
    ...props
}) => {
    return (
        <span
            {...props}
            className={cn(
                `rounded-full px-2 py-1 w-fit capitalize text-xs opacity-50 hover:opacity-100 transition-opacity ${
                    difficulty === "hard"
                        ? "bg-red-500"
                        : difficulty === "medium"
                        ? "bg-yellow-500"
                        : difficulty === "easy"
                        ? "bg-green-500"
                        : "bg-zinc-900"
                }`,
                className
            )}
        >
            {difficulty}
        </span>
    );
};

export default DifficultyTag;
