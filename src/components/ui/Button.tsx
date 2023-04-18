import { ButtonHTMLAttributes, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ButtonVariants = cva(
    "px-5 py-2 text-sm font-medium rounded-md focus:ring outline-none flex items-center gap-2",
    {
        variants: {
            variant: {
                primary:
                    "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
                secondary: "text-zinc-900 dark:text-zinc-50 bg-transparent",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof ButtonVariants> {
    isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
    className,
    children,
    isLoading = false,
    variant,
    ...props
}) => {
    return (
        <button
            className={cn(ButtonVariants({ variant, className }))}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? "Loading..." : children}
            {/* {children} */}
        </button>
    );
};

export default Button;
