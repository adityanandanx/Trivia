import { FC, InputHTMLAttributes } from "react";
import * as Label from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    labelText: string;
    inputText?: string;
    InputElement?: React.ReactNode;
}

const Field: FC<FieldProps> = ({
    labelText,
    id,
    inputText,
    InputElement,
    className,
    ...props
}) => {
    return (
        <fieldset className="flex items-center">
            <Label.Root className="flex-1" htmlFor={id}>
                {labelText}
            </Label.Root>
            {InputElement ? (
                InputElement
            ) : (
                <input
                    className={cn(
                        "flex-1 w-full outline-none bg-zinc-200 dark:bg-zinc-700 px-5 py-2 rounded-md",
                        className
                    )}
                    id={id}
                    placeholder={inputText}
                    {...props}
                />
            )}
        </fieldset>
    );
};

export default Field;
