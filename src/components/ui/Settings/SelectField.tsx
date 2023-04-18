import { FC } from "react";
import * as Select from "@radix-ui/react-select";
import { MdArrowDownward, MdArrowUpward, MdCheck } from "react-icons/md";
import React from "react";
import { cn } from "@/lib/utils";

export interface Item {
    value: string;
    text: string;
}

interface SelectFieldProps extends Select.SelectProps {
    items: Item[];
}

const SelectField: FC<SelectFieldProps> = ({ items, ...props }) => {
    return (
        <Select.Root {...props}>
            <Select.Trigger className="flex items-center justify-between gap-3 bg-zinc-200 dark:bg-zinc-700 px-5 py-2 rounded-md w-full flex-1">
                <Select.Value placeholder="Select a value" />
                <Select.Icon>
                    <MdArrowDownward />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className={`overflow-hidden bg-white p-2 dark:bg-zinc-900 rounded-md`}
                >
                    <Select.ScrollUpButton>
                        <MdArrowUpward />
                    </Select.ScrollUpButton>
                    <Select.Viewport>
                        {items.map((item, i) => (
                            <SelectItem key={i} value={item.value}>
                                {item.text}
                            </SelectItem>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton>
                        <MdArrowDownward />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

interface SelectItemProps extends Select.SelectItemProps {}

const SelectItem: FC<SelectItemProps> = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={cn(
                    `relative flex items-center gap-2 pl-7 text-sm py-1 my-0 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 data-[disabled]:text-zinc-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white dark:data-[highlighted]:bg-green-500 dark:data-[highlighted]:text-white`,
                    className
                )}
                {...props}
                ref={forwardedRef as any}
            >
                <Select.ItemIndicator className="absolute left-1">
                    <MdCheck />
                </Select.ItemIndicator>
                <Select.ItemText className="">{children}</Select.ItemText>
            </Select.Item>
        );
    }
);
SelectItem.displayName = "SelectItem";
export default SelectField;
