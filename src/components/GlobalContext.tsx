"use client";
import { Difficulty, QuestionType, UserSettings } from "@/lib/types";
import { Dispatch, FC, SetStateAction, createContext, useState } from "react";
// import { UserSettings } from "@/lib/types.d";

interface ISettingsContext {
    userSettings: UserSettings;
    setUserSettings: Dispatch<SetStateAction<UserSettings>>;
}

const defaultUserSettings: UserSettings = {
    nofquestions: 10,
    type: QuestionType.multiple,
    category: { id: 9, name: "Some" },
    difficulty: Difficulty.medium,
};

const SettingsContext = createContext<ISettingsContext>({
    userSettings: defaultUserSettings,
    setUserSettings: () => {},
});

interface GlobalContextProviderProps {
    children?: React.ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProviderProps> = ({
    children,
}) => {
    const [userSettings, setUserSettings] =
        useState<UserSettings>(defaultUserSettings);

    return (
        <SettingsContext.Provider value={{ userSettings, setUserSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default GlobalContextProvider;
export { SettingsContext };
