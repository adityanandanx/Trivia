"use client";
import { FC, useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";
import { Category, Difficulty, QuestionType, UserSettings } from "@/lib/types";
import { SettingsContext } from "@/components/GlobalContext";
import Button from "../Button";
import Field from "./Field";
import SelectField from "./SelectField";

interface SettingsProps extends Dialog.DialogProps {
    categories: Category[];
}

const Settings: FC<SettingsProps> = ({
    open,
    categories,
    onOpenChange,
    ...props
}) => {
    const { userSettings, setUserSettings } = useContext(SettingsContext);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
            <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]:animate-overlayShow bg-zinc-900/50 fixed inset-0" />
                <Dialog.Content className="flex flex-col data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-50 dark:bg-zinc-800 p-10 shadow-lg focus:outline-none">
                    <Dialog.Title className="text-2xl font-semibold">
                        Settings
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Customize your trivia.
                    </Dialog.Description>

                    <form className="w-full flex flex-col gap-3">
                        <Field
                            id="nofquestions"
                            labelText="No. of questions"
                            defaultValue={userSettings.nofquestions}
                            onChange={(e) => {
                                setUserSettings((prev) => {
                                    prev.nofquestions = parseInt(
                                        e.currentTarget.value
                                    );
                                    return prev;
                                });
                            }}
                            type="number"
                        />
                        <Field
                            id="difficulty"
                            labelText="Difficulty"
                            InputElement={
                                <SelectField
                                    defaultValue={userSettings.difficulty}
                                    onValueChange={(e) => {
                                        setUserSettings((prev) => {
                                            prev.difficulty = e as Difficulty;
                                            return prev;
                                        });
                                    }}
                                    items={Object.values(Difficulty).map(
                                        (d) => {
                                            return {
                                                value: d,
                                                text: d,
                                            };
                                        }
                                    )}
                                />
                            }
                        />
                        <Field
                            id="category"
                            labelText="Category"
                            InputElement={
                                <SelectField
                                    defaultValue={userSettings.category.id.toString()}
                                    onValueChange={(e) => {
                                        setUserSettings((prev) => {
                                            prev.category = {
                                                id: parseInt(e),
                                                name: `changed${e}`,
                                            };
                                            return prev;
                                        });
                                    }}
                                    items={categories.map((cat) => {
                                        return {
                                            value: cat.id.toString(),
                                            text: cat.name,
                                        };
                                    })}
                                />
                            }
                        />
                        <Field
                            id="type"
                            labelText="Type of Question"
                            InputElement={
                                <SelectField
                                    defaultValue={userSettings.type}
                                    onValueChange={(e) => {
                                        setUserSettings((prev) => {
                                            prev.type = e as QuestionType;
                                            return prev;
                                        });
                                    }}
                                    items={Object.values(QuestionType).map(
                                        (d) => {
                                            return {
                                                value: d,
                                                text: d,
                                            };
                                        }
                                    )}
                                />
                            }
                        />

                        <Button
                            onClick={(e) => {
                                if (!onOpenChange || !open) return;
                                e.preventDefault();
                                localStorage.setItem(
                                    "userSettings",
                                    JSON.stringify(userSettings)
                                );
                                onOpenChange(false);
                            }}
                            type="submit"
                            className="flex self-end"
                        >
                            Save Changes
                        </Button>
                    </form>
                    <Dialog.Close asChild>
                        <Button
                            variant="secondary"
                            brightness="dim"
                            className="absolute top-0 right-0 p-5"
                        >
                            <MdClose />
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Settings;
