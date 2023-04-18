"use client";
import { SettingsContext } from "@/components/GlobalContext";
import Questions from "@/components/Questions";
import { Question } from "@/lib/types";
import { getQuestions } from "@/lib/utils";
import { useContext } from "react";

interface RandomQuestionProps {}

const RandomQuestion = async ({}: RandomQuestionProps) => {
    const { userSettings } = useContext(SettingsContext);
    const questions = await getQuestions(userSettings);

    return (
        <div>
            <Questions questions={questions as Question[]} />
        </div>
    );
};

export default RandomQuestion;
